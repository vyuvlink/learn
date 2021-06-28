import { addClass, removeClass, def } from '../utils';

export default function(tiny) {

    let loading = false;

    def(tiny, 'loading', {
        get() {
            return loading;
        },
        set(val) {
            loading = val;
            if ( loading ) {
                addClass(tiny.el, 'tiny-loading-show')
            } else {
                removeClass(tiny.el, 'tiny-loading-show')
            }
        }
    });
}
