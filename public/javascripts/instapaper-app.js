import '../sass/style.scss';

import { searchForm, submitSearch } from './modules/search';

import {previewEditor, 
        handleDragStart, 
        handleDragEnd, 
        handleDragOver, 
        handleDrop, 
        handleTouchStart, 
        handleTouchEnd} from './modules/preview';

import { stitchBtn, postJson } from './modules/stitch';

const path = window.location.pathname;

if(path === '/'){
    searchForm.addEventListener('submit', submitSearch);
}

if(path === '/scrape'){
    previewEditor.addEventListener('dragstart', handleDragStart);
    previewEditor.addEventListener('dragend', handleDragEnd);
    previewEditor.addEventListener('dragover', handleDragOver);
    previewEditor.addEventListener('drop', handleDrop);
    previewEditor.addEventListener('touchstart', handleTouchStart);
    previewEditor.addEventListener('touchend', handleTouchEnd);

    stitchBtn.addEventListener('click', postJson);
}

if(path === '/scrape' || path === '/download'){
    document.querySelector('body').classList.add('stacked');
}
