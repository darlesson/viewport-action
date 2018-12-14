import { default as viewPortAction } from '../../src/index';

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

viewPortAction.add('#item-1', showByArea);
viewPortAction.add('#item-2', showByArea);
viewPortAction.add('#item-3', showByArea);
viewPortAction.add('#item-4', showByVerticalPixels);

viewPortAction.add(document.getElementById('item-5'), showByVerticalPixels);
viewPortAction.add(document.getElementById('item-6'), showByVerticalPixels);
viewPortAction.add(document.getElementById('item-7'), showByHorizontalPixels);
viewPortAction.add(document.getElementById('item-8'), showByHorizontalPixels);

// Element is not found
viewPortAction.add(document.getElementById('item-to-fail'));