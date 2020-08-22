/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var previewEditor = document.querySelector('.preview');
var previewImgSrcs = Array.from(document.querySelectorAll('.preview_img')).map(function (img) {
    return img.src;
});

var handleDragStart = function handleDragStart(e) {
    var index = previewImgSrcs.indexOf(e.target.src.replace(window.location.href, ''));
    e.dataTransfer.setData('text/plain', index);
    e.target.style.border = '2px dashed #e42b06';
};

var handleDragEnd = function handleDragEnd(e) {
    e.target.style.border = 'none';
};

var handleDragOver = function handleDragOver(e) {
    e.preventDefault();
};

var handleDrop = function handleDrop(e) {
    e.preventDefault();
    if (e.target.className == 'preview_img') {
        var currentTargetSrc = e.target.src.replace(window.location.href, '');
        var currentDroppedSrc = previewImgSrcs[parseInt(e.dataTransfer.getData('text/plain'))];
        var targetIndex = previewImgSrcs.indexOf(currentTargetSrc);

        previewImgSrcs[parseInt(e.dataTransfer.getData('text/plain'))] = currentTargetSrc;
        previewImgSrcs[targetIndex] = currentDroppedSrc;

        reRenderPreview(previewImgSrcs);
    }
};

//touch
var ongoingTouchesSrcs = [];

var handleTouchStart = function handleTouchStart(e) {
    ongoingTouchesSrcs.push(e.target.src.replace(window.location.href, ''));
    e.target.style.border = '2px dashed #e42b06';
};

var handleTouchEnd = function handleTouchEnd(e) {
    if (ongoingTouchesSrcs.length >= 2) {
        var indexToSwap = previewImgSrcs.indexOf(ongoingTouchesSrcs[0]);
        var currentIndex = previewImgSrcs.indexOf(e.target.src.replace(window.location.href, ''));
        previewImgSrcs[currentIndex] = previewImgSrcs[indexToSwap];
        previewImgSrcs[indexToSwap] = e.target.src.replace(window.location.href, '');
        reRenderPreview(previewImgSrcs);
        ongoingTouchesSrcs.length = 0;
    }
};

var reRenderPreview = function reRenderPreview(srcs) {
    previewEditor.innerHTML = '';

    srcs.forEach(function (src) {
        var image = new Image();
        image.src = src;
        image.setAttribute("class", "preview_img");
        image.setAttribute("draggable", true);

        previewEditor.appendChild(image);
    });
};

exports.previewEditor = previewEditor;
exports.handleDragStart = handleDragStart;
exports.handleDragEnd = handleDragEnd;
exports.handleDragOver = handleDragOver;
exports.handleDrop = handleDrop;
exports.handleTouchStart = handleTouchStart;
exports.handleTouchEnd = handleTouchEnd;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _preview = __webpack_require__(0);

_preview.previewEditor.addEventListener("dragstart", _preview.handleDragStart);
_preview.previewEditor.addEventListener("dragend", _preview.handleDragEnd);
_preview.previewEditor.addEventListener("dragover", _preview.handleDragOver);
_preview.previewEditor.addEventListener("drop", _preview.handleDrop);
_preview.previewEditor.addEventListener("touchstart", _preview.handleTouchStart);
_preview.previewEditor.addEventListener("touchend", _preview.handleTouchEnd);

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map