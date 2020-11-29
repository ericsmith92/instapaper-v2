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

import {modalCloseBtn, 
        modalNoShow, 
        toggleModal, 
        modifyLocalStorage} from './modules/modal';

const path = window.location.pathname;

if(path === '/'){
    searchForm.addEventListener('submit', submitSearch);
    modalNoShow.addEventListener('click', modifyLocalStorage);
    modalCloseBtn.addEventListener('click', toggleModal);

    if(localStorage.getItem('noShow') === null){
        toggleModal();
    }
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


modalNoShow.addEventListener('click', modifyLocalStorage);
modalCloseBtn.addEventListener('click', toggleModal);