const stitchBtn = document.querySelector('.btn.stitch');
const axios = require('axios');
import { addLoader } from './loader';

const postJson = () => {
    const stitchImgSrcs = Array.from(document.querySelectorAll('.preview_img')).map(img => img.src);
    const imgSrcsJson = Object.assign({}, stitchImgSrcs);
    const handle = stitchBtn.dataset.handle;

    addLoader();
    
    axios({
        method: 'post',
        url: '/stitch',
        data: {
          sources: imgSrcsJson,
          handle
        }
      })
      .then((response) => {
        window.location.assign(`/download?src=${response.data.stitchedImagePath}&handle=${response.data.handle}`);
      })
      .catch((error) => {
        console.log(error);
      });
}

export { stitchBtn, postJson };