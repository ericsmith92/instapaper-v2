const stitchBtn = document.querySelector('.btn.stitch');
const axios = require('axios');

const postJson = () => {
    const stitchImgSrcs = Array.from(document.querySelectorAll('.preview_img')).map(img => img.src);
    const imgSrcsJson = Object.assign({}, stitchImgSrcs);
    const handle = stitchBtn.dataset.handle;
    
    axios({
        method: 'post',
        url: '/stitch',
        data: {
          sources: imgSrcsJson,
          handle
        }
      });
}

export { stitchBtn, postJson };