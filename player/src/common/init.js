import { def } from '../utils';

export default class Init {
    constructor(tiny) {
        let {
            theme,
            type,
        } = tiny.ops;
        
        def(tiny, 'theme', {
            get() {
                return theme;
            },
            set(val) {
                theme = val;
                tiny.el.style.setProperty('--tiny-theme', theme);
            },
        })
        
        def(tiny, 'type', {
            get() {
                return type;
            },
            set(val) {
                type = val;
                tiny.src = tiny.src;
            },
        })
    }
}