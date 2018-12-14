/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/scripts/examples.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/scripts/examples.js":
/*!**************************************!*\
  !*** ./examples/scripts/examples.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/index */ "./src/index.js");


/**
 * Shows the dimensions found on screen. The intention is to demonstrate
 * the dimensions and positions are correct.
 * 
 * @function visualDebug
 * @param {Event} e The event object.
 */
let visualDebug = (e) => {

    let target = e.target,
        ownerDocument = target.ownerDocument,
        id = `${target.id}-debug`,
        debugElement = ownerDocument.getElementById(id);

    if (!debugElement) {

        debugElement = ownerDocument.createElement('div');
        debugElement.id = id;
        debugElement.classList.add('debug-element');

        ownerDocument.body.appendChild(debugElement);
    }

    debugElement.style.top = e.detail.availableTop + 'px';
    debugElement.style.left = e.detail.availableLeft + 'px';
    debugElement.style.width = e.detail.availableWidth + 'px';
    debugElement.style.height = e.detail.availableHeight + 'px';
}

let removeVisualDebug = (e) => {

    let elements = document.getElementsByClassName('debug-element'),
        i = elements.length;

    while (i--) {
        elements[i].parentNode.removeChild(elements[i]);
    }
}

window.addEventListener('resize', removeVisualDebug, false);
window.addEventListener('scroll', removeVisualDebug, false);

let showByArea = (e) => {

    e.target.innerText = 'Loaded';
    e.target.classList.add('inverted', 'blue');

    visualDebug(e);
}

let showByVerticalPixels = (e) => {

    e.target.innerText = 'Loaded';
    e.target.classList.add('inverted', 'orange');

    visualDebug(e);
}

let showByHorizontalPixels = (e) => {

    e.target.innerText = 'Loaded';
    e.target.classList.add('inverted', 'green');

    visualDebug(e);
}

_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add('#item-1', showByArea);
_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add('#item-2', showByArea);
_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add('#item-3', showByArea);
_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add('#item-4', showByVerticalPixels);

_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add(document.getElementById('item-5'), showByVerticalPixels);
_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add(document.getElementById('item-6'), showByVerticalPixels);
_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add(document.getElementById('item-7'), showByHorizontalPixels);
_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add(document.getElementById('item-8'), showByHorizontalPixels);

// Element is not found
_src_index__WEBPACK_IMPORTED_MODULE_0__["default"].add(document.getElementById('item-to-fail'));

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _viewPortEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewPortEvent */ "./src/viewPortEvent.js");


let timeout = 0;

const defaultOptions = {
    wait: 100,
    skipWhenNotInView: true,
    once: true
};

const items = [];

const createEvent = (element, e, details) => {

    return new _viewPortEvent__WEBPACK_IMPORTED_MODULE_0__["default"](e, {
        target: element,
        detail: details
    });
}

const handler = function (e) {

    clearTimeout(timeout);

    // Delay the checks
    timeout = setTimeout(function () {

        let html = document.documentElement,
            clientHeight = html.clientHeight,
            clientRect,
            details,
            visibleHeight,
            index = items.length,
            item;

        while (index--) {

            item = items[index];
            clientRect = item.element.getBoundingClientRect();
            visibleHeight = clientRect.height;

            if (clientRect.top >= visibleHeight * -1 && clientRect.bottom <= clientHeight + visibleHeight) {

                details = {
                    // Available values
                    availableTop: clientRect.top < 0 ? 0 : clientRect.top,
                    availableBottom: clientRect.bottom > html.clientHeight ? html.clientHeight : clientRect.bottom,
                    availableLeft: clientRect.left < 0 ? 0 : clientRect.left,
                    availableRight: clientRect.right > html.clientWidth ? html.clientWidth : clientRect.right,
                    // Client rect values
                    top: clientRect.top,
                    bottom: clientRect.bottom,
                    left: clientRect.left,
                    right: clientRect.right,
                    height: clientRect.height,
                    width: clientRect.width
                };

                details.availableWidth = details.availableRight - details.availableLeft;
                details.availableHeight = details.availableBottom - details.availableTop;
                details.areaAvailable = details.availableWidth * details.availableHeight;

                item.callback(createEvent(item.element, e, details));
                
                // Remove the element from the list of items as the callback is already
                // executed
                items.splice(index, 1);
            }

        }

        // Unbind the events if there nothing to watch for
        if (!items.length) {
            
            window.removeEventListener("resize", handler, false);
            window.removeEventListener("scroll", handler, false);
        }

    }, 500);
}

const viewPortAction = {

    /**
     * Add elements to be checked when available on the viewport. Also add
     * callback to be executed when the element is on teh viewport.
     * 
     * ```javascript
     * let options = {
     *     // How long it should wait to call the callback. Defaults to 0.
     *     wait: 100,
     *     // Skip calling the callback if the element moves out of the viewport when the wait is over. Defaults to true.
     *     skipWhenNotInView: true,
     *     // Whether to trigger the callback just once. Defaults to true.
     *     once: true,
     *     // The document the element will be checked against. Defaults to window.document.
     *     document: window.document
     * };
     * ```
     * 
     * @method add
     * @param {Element|String} element The HTML element or the selector.
     * @param {Function} callback The function to be executed when on viewport.
     * @param {Object} options Some optional parameters
     */
    add: function (element, callback, options) {

        viewPortAction.whenDocumentReady(function (defaultView, e) {

            // Resolve selectors if element is a string
            element = typeof element === 'string' ? defaultView.document.querySelector(element) : element;

            // Only bind the events if the node is an instance of Element and attached to a document
            if (!(element instanceof Element) || element.ownerDocument !== defaultView.document)
                return;

            options = typeof options === 'object' && !Array.isArray(options) ? {
                wait: typeof options.wait === 'number' ? options.wait : defaultOptions.wait,
                skipWhenNotInView: typeof options.skipWhenNotInView ? options.skipWhenNotInView : defaultOptions.skipWhenNotInView,
                once: typeof options.once === 'boolean' ? options.once : defaultOptions.once
            } : defaultOptions;

            // Only bind the DOM events when there is something to check
            if (!items.length) {

                defaultView.addEventListener("resize", handler, false);
                defaultView.addEventListener("scroll", handler, false);
            }
            
            items.push({
                element: element,
                callback: callback,
                options: options
            });

            // Call the handler right away to check it the element is already in the
            // viewport
            handler(e);

        }, options ? options.document : null);
    },

    whenDocumentReady: function (callback, doc) {

        // Fallback to the current document
        doc = doc && doc.nodeType === 9 ? doc : window.document;

        if (doc.readyState === 'complete') {
            callback(doc.defaultView);
        } else {

            // Support Cordova or document ready events
            doc.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', (e) => {
                callback(doc.defaultView, e);
            }, false);
        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = (viewPortAction);

/***/ }),

/***/ "./src/viewPortEvent.js":
/*!******************************!*\
  !*** ./src/viewPortEvent.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ViewPortEvent {

    constructor (e, options) {

        this._originalEvent = e;
        this._detail = options.detail;
        this._target = options.target;
    }

    get type () {
        return 'viewport';
    }

    get originalEvent () {
        return this._originalEvent;
    }

    get detail () {
        return this._detail;
    }

    get target () {
        return this._target;
    }

    get currentTarget () {
        return this.target;
    }

    get srcElement () {
        return this.target;
    }

    get timeStamp () {
        return this.originalEvent.timeStamp;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ViewPortEvent);

/***/ })

/******/ });
//# sourceMappingURL=examples.js.map