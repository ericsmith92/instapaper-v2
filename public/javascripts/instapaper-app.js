import '../sass/style.scss';

import {previewEditor, 
        handleDragStart, 
        handleDragEnd, 
        handleDragOver, 
        handleDrop, 
        handleTouchStart, 
        handleTouchEnd} from './modules/preview';

import { stitchBtn, postJson } from './modules/stitch';

previewEditor.addEventListener('dragstart', handleDragStart);
previewEditor.addEventListener('dragend', handleDragEnd);
previewEditor.addEventListener('dragover', handleDragOver);
previewEditor.addEventListener('drop', handleDrop);
previewEditor.addEventListener('touchstart', handleTouchStart);
previewEditor.addEventListener('touchend', handleTouchEnd);

stitchBtn.addEventListener('click', postJson);