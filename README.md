# Viewport Action

Provides a way with extra configuration options to execute a handler when a given element is on view.

Few things to know:

* It checks when an element is on view as soon as it's added to `viewportAction`.
* It skips all elements that are not on view at the moment the event triggers the handler.
This means it will not call the handlers for elements that where just scrolled over.

## Example

https://codepen.io/rooyva/pen/aPWNXQ

## Installation

### Using NPM

```shell
npm i viewport-action
```

### Using CDN

```html
<script src="https://cdn.jsdelivr.net/npm/viewport-action@0.2.2/dist/viewportAction.min.js"></script>
```

### Download files

You can download the distribution files from https://github.com/darlesson/viewport-action/tree/master/dist

## Usage

```javascript
// Importing with ES6
import viewportAction from 'viewport-action';
```

```javascript
// Using RequireJS
require(['./src/viewportAction.min'], function (viewportAction) {

});
```

```javascript
// Global reference when not using Require JS
window.viewportAction;
```

#### Bind a handler to an element

You can add elements or selectors with the handlers. The `add` method waits for `whenDocumentReady`
to execute a callback when the document is ready. Only one element can be bound per handler.

```javascript
viewportAction.add('#selector', function (e) { /* Code here */ });

// or

viewportAction.add(document.getElementById('selector'), function (e) { /* Code here */ });
```

#### The event object

The event object is an instance of the custom `ViewportEvent` class. It returns details that can be used to
determine the conditions to change the element bound to the handler.

```javascript
{
    // The event name.
    type: 'viewport',
    // Resize or scroll event instances.
    originalEvent: event,
    // The element bound with the handler.
    target: element,
    // The same as target.
    currentTarget: element,
    // The same as target.
    srcElement: element,
    // The timeStamp from `originalEvent.timeStamp`.
    timeStamp: 345,
    // The event detail object.
    detail: {
        // The element's area visible on the viewport
        availableArea: 318425.015625,
        // The space between the bottom of the viewport and the bottom
        // of the element while in the viewport.
        availableTop: 0,
        // The space between the top of the viewport and the top of the
        // element while in the viewport.
        availableBottom: 440.421875,
        // The element's height shown in the viewport.
        availableHeight: 440.421875,
        // The space between the left of the viewport and the left of the
        // element while in the viewport.
        availableLeft: 118,
        // The space between the right of the viewport and the right of the
        // element while in the viewport.
        availableRight: 841,
        // The element's width shown in the viewport.
        availableWidth: 723,
        // The same as `element.getBoundingClientRect().top`.
        top: -63.578125,
        // The same as `element.getBoundingClientRect().bottom`.
        bottom: 440.421875,
        // The same as `element.getBoundingClientRect().height`.
        height: 504,
        // The same as `element.getBoundingClientRect().left`.
        left: 118,
        // The same as `element.getBoundingClientRect().right`.
        right: 841,
        // The same as `element.getBoundingClientRect().width`.
        width: 723
    }
}
```

#### Setting options

Below are some options that can be passed when adding the element and handler and their default values.

```javascript
const options = {
    // How long the handler will wait after the original event stops triggering.
    wait: 100,
    // Whether to unbind the handler after executed for the first time.
    once: false
};

viewportAction.add('#selector', function (e) { /* Code here */ }, options);
```

#### Executing the handler once

You can have the handler unbinding on the first time the element is on the viewport.

```javascript
var options = {
    once: true
};

viewportAction.add('#selector', function (e) {
    e.target.innerText = 'Element on viewport.';
}, options);
```

#### Unbing the handler when meeting a condition

You can allow the handler to be executed until a condition is met and only then unbind it.

```javascript
viewportAction.add('#selector', function (e) {

    // Load an image inside the element when the area visible is bigger
    // than 1000 pixels.
    if (e.detail.availableArea > 1000) {

        e.target.innerText = 'Element on viewport.';

        // Remove handler
        e.removeHandler();
    }
});
```

#### Check whether an element is on the viewport

You can check whether an element is on the viewport on demand without waiting for document changes.

```javascript
// You can use a selector or the element itself
viewportAction.check('#selector', function (e) {
    // Code here
}, function () {
    // Optional callback handler if the element is not on the document. Just one of the
    // 2 callbacks is called.
});
```

## Testing and developing

You can run the command below to build the application and run a server to test and deveop.

```
npm run start:dev
```

Open http://localhost:9000/ on your browser.

## License

[MIT License](https://github.com/darlesson/viewport-action/blob/master/LICENSE)