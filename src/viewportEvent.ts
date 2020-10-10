import EventOptions from './EventOptions';

/**
 * The event specific to the ViewportAction.
 */
class ViewportEvent {

    readonly type: 'viewport';
    readonly originalEvent: Event;
    readonly detail: Object;
    readonly target: HTMLElement;
    readonly removeHandler: () => void;

    constructor (e: Event, options: EventOptions) {

        this.originalEvent = e;
        this.detail = options.detail;
        this.target = options.target;
        this.removeHandler = options.removeHandler;
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

export default ViewportEvent;