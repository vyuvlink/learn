import { def, getUrlPostfix } from '../utils';

export default function(tiny) {
    const {
        ops,
        player,
    } = tiny;

    def(tiny, 'url', {
        get() {
            return player.src;
        },
        set(val) {
            const type = ops.type || getUrlPostfix(ops.url),
                  mixin = ops.mixin[type];
                  
            if ( type && mixin ) {
                tiny.loading = true;
                mixin.call(null, player, val);
            } else {
                player.src = val;
                tiny.emit('url', val);
            }
        },
    });
}
