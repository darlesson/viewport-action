import viewportAction from '../../src/index';

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

    if (e.detail.availableArea > 10) {

        e.target.innerText = 'Loaded';
        e.target.classList.add('inverted', 'blue');

        visualDebug(e);

        e.removeHandler();
    }
}

let showByVerticalPixels = (e) => {

    if (e.detail.availableHeight > 10) {

        e.target.innerText = 'Loaded';
        e.target.classList.add('inverted', 'orange');

        visualDebug(e);

        e.removeHandler();
    }
}

let showByHorizontalPixels = (e) => {

    if (e.detail.availableWidth > 10) {

        e.target.innerText = 'Loaded';
        e.target.classList.add('inverted', 'green');

        visualDebug(e);

        e.removeHandler();
    }
}

// Using selectors
viewportAction.add('#item-1', showByArea);
viewportAction.add('#item-2', showByArea);
viewportAction.add('#item-3', showByArea);
viewportAction.add('#item-4', showByVerticalPixels);

// Using elements
viewportAction.add(document.getElementById('item-5'), showByVerticalPixels, {
    once: true
});

viewportAction.add(document.getElementById('item-6'), showByVerticalPixels);
viewportAction.add(document.getElementById('item-7'), showByHorizontalPixels);
viewportAction.add(document.getElementById('item-8'), showByHorizontalPixels);

// Element is not found
viewportAction.add(document.getElementById('item-to-fail'));

// Tabs (only the visible one should be visible in the viewport)
viewportAction.add('#item-tab-1', showByArea);
viewportAction.add('#item-tab-2', showByArea);
viewportAction.add('#item-tab-3', showByArea);

// Enable tabs
$('.menu .item').tab({
    onVisible: function () {
        viewportAction.check(this, showByArea);
    }
});