const Jimp = require('jimp');
const fs = require('fs');

exports.resizeAndWriteThumbnails = async (req, res, next) => {
  
  const imageSrcs = Object.values(req.body.sources);
  
  for(let i = 0; i < imageSrcs.length; i++){
    await Jimp.read(imageSrcs[i])
              .then(img => {
                  return img
                  .resize(300, 300)
                  .write(`public/images/user-images/${req.body.handle}/${i}.jpg`);
              })
              .catch( err => {
                  console.error(err);
    });
  }

  next();
}

exports.stitchImages = async (req, res) => {

  const urls = fs.readdirSync(`public/images/user-images/${req.body.handle}/`).map(file => `public/images/user-images/${req.body.handle}/${file}`);
  const sortedUrls = await sortUrls(urls);
  const images = [`public/images/canvas/canvas.png`, ...sortedUrls]; 
  const jimps = images.map(img => Jimp.read(img));

  Promise.all(jimps).then( _ => {
    return Promise.all(jimps);
  })
  .then( data => {
    let pixelX = 0;
    let pixelY = 0;
    //TODO: make this loop logic cleaner by starting at i = 1, we don't need to loop over the first index of this array
    for(let i = 0; i < data.length - 1; i++){
      data[0].composite(data[i + 1], pixelX, pixelY);

      pixelX = (i + 1) % 3 !== 0 ? pixelX + 300 : 0;

      if( (i + 1) % 3 === 0){
        pixelY = pixelY + 300;
      }
    }
   
    const stitchedImagePath = `public/images/user-images/${req.body.handle}/${Date.now()}.png`
    
   data[0].write(stitchedImagePath, _ => {
        res.send(stitchedImagePath);
   });
})
.catch(err => console.log(err));
}

sortUrls = (urls) => {
  
  const sortedUrls = urls.sort((a, b) => {
    
    const intA = parseInt(a.slice(a.lastIndexOf('/') + 1, a.indexOf('.')));
    const intB = parseInt(b.slice(b.lastIndexOf('/') + 1, b.indexOf('.')));

    if (intA < intB) {
        return -1;
      }
      if (intA > intB) {
        return 1;
      }
    
      return 0;
  });

  return sortedUrls;
}
