const previewEditor = document.querySelector('.preview');
const previewImgSrcs = Array.from(document.querySelectorAll('.preview_img')).map(img => img.src);

const handleDragStart = (e) => {
    const index = previewImgSrcs.indexOf(e.target.src.replace(window.location.href, ''));
    e.dataTransfer.setData('text/plain', index);
    e.target.style.border = '2px dashed #e42b06';
}

const handleDragEnd = (e) => {
    e.target.style.border = 'none';
}

const handleDragOver = (e) => {
    e.preventDefault();
}

const handleDrop = (e) => {
    e.preventDefault();
    if ( e.target.className == 'preview_img' ) {
        const currentTargetSrc = e.target.src.replace(window.location.href, '');
        const currentDroppedSrc = previewImgSrcs[parseInt(e.dataTransfer.getData('text/plain'))];
        const targetIndex = previewImgSrcs.indexOf(currentTargetSrc);

        previewImgSrcs[parseInt(e.dataTransfer.getData('text/plain'))] = currentTargetSrc;
        previewImgSrcs[targetIndex] = currentDroppedSrc;

        reRenderPreview(previewImgSrcs);
    }
}

//touch
const ongoingTouchesSrcs = [];

const handleTouchStart = (e) => {
    ongoingTouchesSrcs.push(e.target.src.replace(window.location.href, ''));
    e.target.style.border = '2px dashed #e42b06';
}

const handleTouchEnd = (e) =>{
    if(ongoingTouchesSrcs.length >= 2){
        let indexToSwap = previewImgSrcs.indexOf(ongoingTouchesSrcs[0]);
        let currentIndex = previewImgSrcs.indexOf(e.target.src.replace(window.location.href, ''));
        previewImgSrcs[currentIndex] = previewImgSrcs[indexToSwap];
        previewImgSrcs[indexToSwap] = e.target.src.replace(window.location.href, '');
        reRenderPreview(previewImgSrcs);
        ongoingTouchesSrcs.length = 0;
    }
}

const reRenderPreview = (srcs) => {
    previewEditor.innerHTML = '';

    srcs.forEach(src => {
        const image = new Image();
        image.src = src;
        image.setAttribute("class", "preview_img");
        image.setAttribute("draggable", true);

        previewEditor.appendChild(image);
       });
}

export{ previewEditor, 
        handleDragStart, 
        handleDragEnd, 
        handleDragOver, 
        handleDrop, 
        handleTouchStart, 
        handleTouchEnd
    };