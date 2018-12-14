# View Port Action

Provides a way with extra configuration options to execute a handler when a given element is on view.

## Installation

### Using NPM

### Using CDN

### Download files

## Usage

#### Executing the handler once

You can have the handler unbinding on the first time the element is on the viewport.

```javascript
var options = {
    once: true
};

viewPortAction.add('#selector', function (e) {
    e.target.innerText = 'Element on viewport.';
}, options);
```

#### Unbing the handler when meeting a condition

You can allow the handler to be executed until a condition is met and only then unbind it.

```javascript
viewPortAction.add('#selector', function (e) {

    // Load an image inside the element when the area visible is bigger
    // than 1000 pixels.
    if (e.detail.area > 1000) {

        e.target.innerText = 'Element on viewport.';

        // Remove handler
        e.removeHandler();
    }
});
```

## Testing and developing

You can run the command below to build the application and run a server to test and deveop.

```
npm run start:dev
```

Open http://localhost:9000/ on your browser.

## License

MIT License.