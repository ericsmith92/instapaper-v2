const path = require('path');
const concat = require('concat-stream');
const Jimp = require('jimp');
const fs = require('fs');


exports.stitch = async (req, res) => {
    const imageSrcs = Object.values(req.body);
    await resizeAndWriteThumbnails(imageSrcs);
    stitchImages(res);
}

resizeAndWriteThumbnails = async (srcs) => {
  for(let i = 0; i < srcs.length; i++){
    await Jimp.read(srcs[i])
              .then(img => {
                  return img
                  .resize(300, 300)
                  .write(`public/images/user-images/raptors/${i}.jpg`);
              })
              .catch( err => {
                  console.error(err);
    });
  }
}

stitchImages = (res) => {

  const urls = fs.readdirSync('public/images/user-images/raptors/').map(file => `public/images/user-images/raptors/${file}`);
  /*TODO: sort this array based on integer value of filename
  right now we are getting:
  [   'public/images/user-images/raptors/0.jpg',
      'public/images/user-images/raptors/1.jpg',
      'public/images/user-images/raptors/10.jpg',
      'public/images/user-images/raptors/11.jpg',
      'public/images/user-images/raptors/2.jpg',
      'public/images/user-images/raptors/3.jpg',
      'public/images/user-images/raptors/4.jpg',
      'public/images/user-images/raptors/5.jpg',
      'public/images/user-images/raptors/6.jpg',
      'public/images/user-images/raptors/7.jpg',
      'public/images/user-images/raptors/8.jpg',
      'public/images/user-images/raptors/9.jpg' ]
  */
  console.log(urls);
  const images = [`public/images/canvas/canvas.png`, ...urls]; 
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
    
   data[0].write(`public/images/user-images/raptors/${uniqueString}.png`, _ => {
        const resObj = {
            'url': `public/images/user-images/raptors/${uniqueString}.png`
        }
        res.json(resObj);
   });
})
.catch(err => console.log(err));
}