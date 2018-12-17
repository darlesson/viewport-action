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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _viewportEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewportEvent */ "./src/viewportEvent.js");


let timeout = 0;

const defaultOptions = {
    wait: 100,
    once: false
};

const items = new Set();

const createEvent = (element, e, details, removeHandler) => {

    return new _viewportEvent__WEBPACK_IMPORTED_MODULE_0__["default"](e, {
        target: element,
        detail: details,
        removeHandler: removeHandler
    });
}

const removeMethod = function (item) {

    return function () {
        
        if (items.has(item))
            items.delete(item);
    };
};

const handler = function (e) {

    clearTimeout(timeout);

    // Delay the checks
    timeout = setTimeout(function () {

        let html = document.documentElement,
            clientHeight = html.clientHeight,
            clientRect,
            details,
            visibleHeight,
            item,
            options;

        for (item of items) {

            options = item.options;
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
                details.availableArea = details.availableWidth * details.availableHeight;

                item.callback(createEvent(item.element, e, details, removeMethod(item)));
                
                // Remove the element from the list of items as the callback is already executed
                if (options.once)
                    items.delete(item);
            }

        }

        // Unbind the events if there nothing to watch for
        if (!items.size) {
            
            window.removeEventListener('resize', handler, false);
            window.removeEventListener('scroll', handler, false);
        }

    }, 500);
}

const viewportAction = {

    /**
     * Add elements to be checked when available on the viewport. Also add
     * callback to be executed when the element is on teh viewport.
     * 
     * ```javascript
     * let options = {
     *     // How long it should wait to call the callback. Defaults to 0.
     *     wait: 100,
     *     // Whether to trigger the callback just once. Defaults to false.
     *     once: false,
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

        viewportAction.whenDocumentReady(function (defaultView, e) {

            // Resolve selectors if element is a string
            element = typeof element === 'string' ? defaultView.document.querySelector(element) : element;

            // Only bind the events if the node is an instance of Element and attached to a document
            if (!(element instanceof Element) || element.ownerDocument !== defaultView.document)
                return;

            options = typeof options === 'object' && !Array.isArray(options) ? {
                wait: typeof options.wait === 'number' ? options.wait : defaultOptions.wait,
                once: typeof options.once === 'boolean' ? options.once : defaultOptions.once
            } : defaultOptions;

            // Only bind the DOM events when there is something to check
            if (!items.size) {

                defaultView.addEventListener('resize', handler, false);
                defaultView.addEventListener('scroll', handler, false);
            }
            
            items.add({
                element: element,
                callback: callback,
                options: options
            });

            // Call the handler right away to check it the element is already in the
            // viewport
            handler(e);

        }, options ? options.document : null);
    },

    /**
     * Execute a callback function when a given document is ready.
     * 
     * @method whenDocumentReady
     * @param {Function} callback 
     * @param {Document} doc The optional document. It defaults to `window.document`.
     */
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

/* harmony default export */ __webpack_exports__["default"] = (viewportAction);

/***/ }),

/***/ "./src/viewportEvent.js":
/*!******************************!*\
  !*** ./src/viewportEvent.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ViewportEvent {

    constructor (e, options) {

        this._originalEvent = e;
        this._detail = options.detail;
        this._target = options.target;
        this._removeHandler = options.removeHandler;
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

    removeHandler () {
        this._removeHandler();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ViewportEvent);

/***/ })

/******/ });
//# sourceMappingURL=viewportAction.js.map