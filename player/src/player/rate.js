import { def } from '../utils';

export default function(tiny) {
    const {
        player,
    } = tiny;

    let rate = 1;

    def(tiny, 'rate', {
        get() {
            return rate;
        },
        set(val) {
            if ( [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].indexOf(val) > -1 && val != rate ) {
                rate = val;
                player.playbackRate = rate;
            }
        }
    });
}
