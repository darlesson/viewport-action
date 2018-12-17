import ViewportEvent from './viewportEvent';

let timeout = 0;

const defaultOptions = {
    wait: 100,
    once: false
};

const items = [];

const createEvent = (element, e, details, removeHandler) => {

    return new ViewportEvent(e, {
        target: element,
        detail: details,
        removeHandler: removeHandler
    });
}

const removeMethod = function (item) {

    return function () {
        
        for (let i = 0, iLen = items.length; i < iLen; i++) {

            if (items[i] === item) {

                items.splice(i, 1);
                break;
            }
        }
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
            index = items.length,
            item,
            options;

        while (index--) {

            item = items[index];
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

        viewPortAction.whenDocumentReady(function (defaultView, e) {

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

export default viewPortAction;