export interface Detail {
    availableTop: number;
    availableBottom: number;
    availableLeft: number;
    availableRight: number;
    availableWidth: number;
    availableHeight: number;
    availableArea: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
    width: number;
}

export default interface EventOptions {
    detail: Detail;
    target: HTMLElement;
    removeHandler: () => void;
}