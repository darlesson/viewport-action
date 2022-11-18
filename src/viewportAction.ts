import { Detail } from './EventOptions';
import ViewportEvent from './viewportEvent';

let timeout: any;

export interface Item {
    element: HTMLElement;
    callback: Callback;
    options: Options;
}

export interface Options {
    readonly wait?: number;
    readonly once?: boolean;
    readonly document?: Document;
}

export type Callback = (e?: ViewportEvent) => void;

const items = new Set<Item>();

const defaultAddOptions = {
    wait: 50,
    once: false,
    document: window.document
}

const createEvent = (element: HTMLElement, e: Event, detail: Detail, removeHandler: () => void) => {

    return new ViewportEvent(e, {
        target: element,
        detail,
        removeHandler
    });
}

const removeMethod = (item: Item) => {

    return () => {
        
        if (items.has(item))
            items.delete(item);
    };
}

/**
 * Resolve selectors if element is a string.
 * 
 * @method getElement
 * @param element The element or selector.
 * @param defaultView The window where the element is from.
 */
const getElement = (element: HTMLElement | String, defaultView: Window) => {
    return (typeof element === 'string' ? defaultView.document.querySelector(element) : element) as HTMLElement;
}

const check = (item: Item, items: Set<Item>, clientWidth: number, clientHeight: number, e?: Event) => {

    let options = item.options,
        clientRect = item.element.getBoundingClientRect(),
        visibleHeight = clientRect.height;

    if (clientRect.top >= visibleHeight * -1 && clientRect.bottom <= clientHeight + visibleHeight) {

        const availableTop = clientRect.top < 0 ? 0 : clientRect.top;
        const availableBottom = clientRect.bottom > clientHeight ? clientHeight : clientRect.bottom;
        const availableLeft = clientRect.left < 0 ? 0 : clientRect.left;
        const availableRight = clientRect.right > clientWidth ? clientWidth : clientRect.right;
        const availableWidth = availableRight - availableLeft;
        const availableHeight = availableBottom - availableTop;

        const detail: Detail = Object.freeze({
            // Available values
            availableTop,
            availableBottom,
            availableLeft,
            availableRight,
            availableWidth: availableRight - availableLeft,
            availableHeight: availableBottom - availableTop,
            availableArea: availableWidth * availableHeight,
            // Client rect values
            top: clientRect.top,
            bottom: clientRect.bottom,
            left: clientRect.left,
            right: clientRect.right,
            height: clientRect.height,
            width: clientRect.width
        });

        item.callback(createEvent(item.element, e, detail, removeMethod(item)));
        
        // Remove the element from the list of items as the callback is already executed
        if (options.once)
            items.delete(item);
    }
}

const handler = (e: Event) => {

    clearTimeout(timeout);

    // Delay the checks
    timeout = setTimeout(() => {

        let html = document.documentElement,
            clientWidth = html.clientWidth,
            clientHeight = html.clientHeight,
            item;

        for (item of items) {
            check(item, items, clientWidth, clientHeight, e);
        }

        // Unbind the events if there nothing to watch for
        if (!items.size) {
            
            window.removeEventListener('resize', handler, false);
            window.removeEventListener('scroll', handler, false);
        }

    }, 100);
}

const viewportAction = Object.create({
    
    /**
     * Execute a callback function when a given document is ready.
     * 
     * NOTE: this method is used internally by the other methods and it's
     * exposed for convenience in case you would like to used it.
     * 
     * @param callback 
     * @param doc The optional document. It defaults to `window.document`.
     */
    whenDocumentReady: (callback: (defaultView?: Window, e?: Event) => void, doc: Document) => {

        // Fallback to the current document
        doc = doc && doc.nodeType === 9 ? doc : window.document;

        if (doc.readyState === 'complete') {
            callback(doc.defaultView);
        } else {

            // Support Cordova or document ready events
            doc.addEventListener((window as any).cordova ? 'deviceready' : 'DOMContentLoaded', (e: Event) => {
                callback(doc.defaultView, e);
            }, false);
        }
    },

    /**
     * Add elements to be checked when available on the viewport. Also add
     * callback to be executed when the element is on the viewport.
     * 
     * ```javascript
     * const options = {
     *     // How long it should wait to call the callback. Defaults to 0.
     *     wait: 50,
     *     // Whether to trigger the callback just once. Defaults to false.
     *     once: false,
     *     // The document the element will be checked against. Defaults to window.document.
     *     document: window.document
     * };
     * 
     * viewportAction.add('#my-selector-or-element', (e) => { ... }, options);
     * ```
     * 
     * @param element The HTML element or the selector.
     * @param callback The function to be executed when on viewport.
     * @param options Some optional parameters
     */
    add: function (element: HTMLElement | String, callback: Callback, options: Options = {}) {

        const mergedOptions = {...options, ...defaultAddOptions};

        this.whenDocumentReady((defaultView: Window, e: Event) => {

            element = getElement(element, defaultView);

            // Only bind the events if the node is an instance of Element and attached to a document
            if (!(element instanceof Element) || element.ownerDocument !== defaultView.document)
                return;

            // Only bind the DOM events when there is something to check
            if (!items.size) {

                defaultView.addEventListener('resize', handler, false);
                defaultView.addEventListener('scroll', handler, false);
            }
            
            items.add({
                element,
                callback,
                options: mergedOptions
            });

            // Call the handler right away to check it the element is already in the
            // viewport
            handler(e);

        }, mergedOptions ? mergedOptions.document : null);
    },

    /**
     * Check when an element is on the viewport.
     * 
     * @param element The element or selector.
     * @param callback The function to be executed when on viewport.
     * @param failedCallback The function to be executed when the element is not found in the document. 
     */
    check: (element: HTMLElement | String, callback: Callback, failedCallback: Function) => {

        element = getElement(element, window);

        // Only bind the events if the node is an instance of Element and attached to a document
        if (!(element instanceof Element) || element.ownerDocument !== window.document) {
            failedCallback();
            return;
        }

        const html = document.documentElement;
        const item = {
            element,
            callback,
            options: {
                wait: 0,
                once: false
            }
        };

        check(item, new Set(), html.clientWidth, html.clientHeight);
    }
});

export default viewportAction;