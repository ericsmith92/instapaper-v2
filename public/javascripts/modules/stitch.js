const stitchBtn = document.querySelector('.btn.stitch');
const axios = require('axios');

const postJson = () => {
    const stitchImgSrcs = Array.from(document.querySelectorAll('.preview_img')).map(img => img.src);
    const myJson = Object.assign({}, stitchImgSrcs);
    axios({
        method: 'post',
        url: '/stitch',
        data: myJson 
      });
}

export { stitchBtn, postJson };