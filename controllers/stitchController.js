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
    for(let i = 0; i < data.length - 1; i++){
      data[0].composite(data[i + 1], pixelX, pixelY);

      pixelX = (i + 1) % 3 !== 0 ? pixelX + 300 : 0;

      if( (i + 1) % 3 === 0){
        pixelY = pixelY + 300;
      }
    }
   
    const stitchedImagePath = `public/images/user-images/${req.body.handle}/${Date.now()}.png`
    
   data[0].write(stitchedImagePath, _ => {
        //TODO: res.render() a download view in pug
        res.json(stitchedImagePath);
   });
})
.catch(err => console.log(err));
}

sortUrls = (urls) => {
  
  const sortedUrls = urls.sort((a, b) => {
    const firstPositionA = a.lastIndexOf('/');
    const lastPositionA = a.indexOf('.');
    const intA = parseInt(a.slice(firstPositionA + 1, lastPositionA));

    const firstPositionB = b.lastIndexOf('/');
    const lastPositionB = b.indexOf('.');
    const intB = parseInt(b.slice(firstPositionB + 1, lastPositionB));

    if (intA < intB) {
        return -1;
      }
      if (intA > intB) {
        return 1;
      }
    
      // ints must be equal
      return 0;
  });

  return sortedUrls;
}