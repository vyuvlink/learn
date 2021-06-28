import { tarAddEventListener } from '..';
import { query, addClass, removeClass, def } from '../utils';

export default function(tiny) {
    const {
        el,
        player,
    } = tiny;

    let playerStatsus = true,
        playerDisplayTime = 5000,
        playerDisplayTimerId = 0;
    const playEl = query('.tiny-play', el);

    def(tiny, 'paused', {
        get() {
            return player.paused;
        },
        set() {
            togglePlayStatus()
        },
    });

    def(tiny, 'playing', {
        get() {
            return !!(player.currentTime > 0 && !player.paused && !player.ended && player.readyState > 2);
        },
        set(val) {
            togglePlayStatus(val)
        },
    });


    if ( tiny.isMobile ) {
        tarAddEventListener(playEl, 'touchstart', ()=>{
            togglePlayStatus(1);
        })
        tarAddEventListener(player, 'touchstart', ()=>{
            togglePlayStatus(1)
            clearTimeout(playerDisplayTimerId);
            if ( playerStatsus ) {
                playerDisplayTimerId = setTimeout(()=>{
                   tiny.control = false;
                }, playerDisplayTime);
            } else {
                tiny.control = true;
            }
        })
    } else {
        tarAddEventListener(playEl, 'mousedown', ()=>{
            togglePlayStatus(1)
        })
        tarAddEventListener(player, 'mousedown', ()=>{
            togglePlayStatus(1)
        })
    }

    function togglePlayStatus(isHand) {
        playerStatsus = player.paused;
        if ( playerStatsus ) {
            addClass(el, 'tiny-play-show');
        } else {
            removeClass(el, 'tiny-play-show');
        }
        if ( isHand ) {
            if ( playerStatsus ) {
                player.play();
            } else {
                player.pause();
            }   
        }
    }
}
