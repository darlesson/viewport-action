import EventOptions from './EventOptions';
declare class ViewportEvent {
    readonly type: 'viewport';
    readonly originalEvent: Event;
    readonly detail: Object;
    readonly target: HTMLElement;
    readonly removeHandler: () => void;
    constructor(e: Event, options: EventOptions);
    get currentTarget(): HTMLElement;
    get srcElement(): HTMLElement;
    get timeStamp(): number;
}
export default ViewportEvent;
