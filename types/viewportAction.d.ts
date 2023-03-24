import ViewportEvent from './viewportEvent';
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
declare const viewportAction: any;
export default viewportAction;
