import { query, addClass, removeClass } from '../utils';

export default class Notice {
    constructor(tiny) {
        this.el = tiny.el;
        this.noticeEl = query('.tiny-notice .tiny-notice-inner', this.el);
        this.time = 2000;
        this.timerId = null;
    }

    set show(msg) {
        this.noticeEl.innerText = msg instanceof Error ? msg.message.trim() : msg;
        addClass(this.el, 'tiny-notice-show');
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            this.noticeEl.innerText = '';
            removeClass(this.el, 'tiny-notice-show');
        }, this.time);
    }
}
