const path = require('path');
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
    data[0].composite(data[1],0, 0);
    data[0].composite(data[2],300, 0);
    data[0].composite(data[3],600, 0);
    data[0].composite(data[4],0, 300);
    data[0].composite(data[5],300, 300);
    data[0].composite(data[6],600, 300);
    data[0].composite(data[7],0, 600);
    data[0].composite(data[8],300, 600);
    data[0].composite(data[9],600, 600);
    data[0].composite(data[10],0, 900);
    data[0].composite(data[11],300, 900);
    data[0].composite(data[12],600, 900);

    let uniqueString = Date.now();
    
   data[0].write(`public/images/user-images/${req.body.handle}/${uniqueString}.png`, _ => {
        const resObj = {
            'url': `public/images/user-images/${req.body.handle}/${uniqueString}.png`
        }
        //TODO: res.render() a download view in pug
        res.json(resObj);
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