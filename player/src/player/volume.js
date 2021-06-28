import { def, betweenWith } from '../utils';

export default function(tiny) {
    const {
        ops,
        player,
    } = tiny;

    let volume = ops.volume || ops.videoAttr && ops.videoAttr.volume,
        muted = ops.muted || ops.videoAttr && ops.videoAttr.muted;

    def(tiny, 'muted', {
        get() {
            return muted;
        },
        set(val) {
            muted = !!val;
            player.muted = muted;
            if ( muted ) {
                tiny.notice.show = `${tiny.i18n['Mute']}`;
            }
            tiny.emit('muted', player.muted);
        },
    });

    def(tiny, 'volume', {
        get() {
            return volume;
        },
        set(val) {
            if ( !muted ) {
                volume = betweenWith(0, val, 1);
                if ( volume != player.volume ) {
                    player.volume = volume;
                    tiny.notice.show = `${tiny.i18n['Volume']}: ${parseInt(player.volume * 100)}`;
                    tiny.emit('volume', player.volume);
                }
            }
        },
    });
}
