import { query, msToTime, def } from '../utils';

export default function time(tiny) {
    const {
        el,
        player,
    } = tiny;

    let currentTime = -1;
    const timeEl = query('.tiny-time', el);

    def(tiny, 'currentTime', {
        get() {
            return currentTime;
        },
        set(val) {
            setTime(val);
        }
    });

    time.add = () => {
        
    }

    time.remove = () => {
        
    }

    function setTime(time) {
        if ( currentTime != time ) {
            currentTime = time;
            timeEl.innerText = `${msToTime(time, 'h:M:s')} / ${msToTime(player.duration, 'h:M:s')}`;
        }
    }
}
