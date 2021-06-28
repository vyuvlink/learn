export default class Logger {
    constructor(name) {
        this.name = typeof name === 'string' && name || 'TinyPlayer';
    }

    set log(msg) {
        console.log(`${this.name} ${msg}`)
    }

    set warn(msg) {
        console.warn(`${this.name} ${msg}`)
    }

    set err(msg) {
        console.error(new TinyPlayerError(`${this.name} ${msg}`))
    }
}

class TinyPlayerError extends Error {
    constructor(message, context) {
        super(message);
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, context || this.constructor);
        }
    }
}