const searchForm = document.getElementById('search-handle');
const axios = require('axios');
import { addLoader } from './loader';

const submitSearch = (e) => {
    
    e.preventDefault();
    const searchInput = document.getElementById('search');
    const regex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;
    
    if(regex.test(searchInput.value)){
      
      addLoader();

      axios({
        method: 'post',
        url: '/scrape',
        data: {
          search: searchInput.value
        }
      })
      .then((response) => {
        console.log('fired'); 
        const encodedImageSources = response.data.imageSources.map(url => encodeURIComponent(url)).join();
        window.location.assign(`/scrape?handle=${response.data.handle}&srcs=${encodedImageSources}`)
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.status === 501){
            window.location.assign(`/not-available`);
          }
        }
      });
    }else{ 
      const searchError = document.querySelector('.search-error');
      searchError.innerText = 'Invalid Instagram Handle';
    }
}

export { searchForm, submitSearch };