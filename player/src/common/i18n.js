import { i18n, tinyOptions } from '../config';
import { def, mergeDeep } from '../utils';

export default class I18n {
    constructor(tiny) {
        this.lang = tiny.lang || tinyOptions.lang;
    }
    
    // let lang = tiny.lang || tinyOptions.lang;

    // def(tiny, 'lang', {
    //     get() {
    //         return lang;
    //     },
    //     set(val) {
    //         if ( i18n[val] && lang != val ) {
    //             lang = val;
    //             tiny.i18n = mergeDeep(i18n[lang], tiny.ops.i18n && tiny.ops.i18n[lang] || {})
    //             tiny.notice.show = tiny.i18n['Lang'];
    //         }
    //         tiny.emit('i18n', lang);
    //     },
    // })
}
