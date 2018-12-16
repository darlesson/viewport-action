class ViewportEvent {

    constructor (e, options) {

        this._originalEvent = e;
        this._detail = options.detail;
        this._target = options.target;
    }

    get type () {
        return 'viewport';
    }

    get originalEvent () {
        return this._originalEvent;
    }

    get detail () {
        return this._detail;
    }

    get target () {
        return this._target;
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