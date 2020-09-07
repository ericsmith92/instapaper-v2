const searchForm = document.getElementById('search-handle');
const axios = require('axios');

const submitSearch = (e) => {
    
    e.preventDefault();
    const searchInput = document.getElementById('search');
    const regex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;
    
    if(regex.test(searchInput.value)){
      axios({
        method: 'post',
        url: '/scrape',
        data: {
          search: searchInput.value
        }
      })
      .then((response) => {
        //TODO: Pass Below as parameters and push to scrape
        //window.location.assign(`/scrape`);
        //https://stackoverflow.com/questions/6243051/how-to-pass-an-array-within-a-query-string/9547490
        console.log(response.data.imageSources);
        const encodedImageSources = response.data.imageSources.map(url => encodeURIComponent(url)).join();
        window.location.assign(`/scrape?handle=${response.data.handle}&srcs=${encodedImageSources}`)
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      console.log('not a real instagram handle');
    }
}

export { searchForm, submitSearch };