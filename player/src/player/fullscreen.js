import { def, query, addClass, removeClass } from '../utils';
import { tarAddEventListener } from '..';

export default function(tiny) {
    const {
        el,
        player
    } = tiny;

    const innerEl = query('.tiny-player-inner', el),
          fullscreenEl = query('.tiny-fullscreen', el);

    let fullscreen = false,
        playerFullscreen = false,
        fullscreenchange = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].find(i=>document[`on${i}`] == null);

    tarAddEventListener(document, fullscreenchange, () => {
        playerFullscreen = player.webkitDisplayingFullscreen || Document.fullscreenElement || document.fullscreen;
        if (playerFullscreen) {
            addClass(tiny.el, 'tiny-fullscreen');
        } else {
            removeClass(tiny.el, 'tiny-fullscreen');
        }
    });

    def(tiny, 'fullscreen', {
        get() {
            return fullscreen;
        },
        set(val) {
            fullscreen = val;
            if ( !!fullscreen ) {
                if ( fullscreen === 'h5' ) {
                    // if ( playerFullscreen ) {
                    //     toggleFullscreen(innerEl);
                    // }
                    addClass(tiny.el, 'tiny-fullscreen');
                } else if ( fullscreen === 'landscape' ) {
                    // if ( playerFullscreen ) {
                    //     toggleFullscreen(innerEl);
                    // }
                } else if ( fullscreen === 'portrait' ) {
                    
                }
            } else if ( playerFullscreen ) {
                toggleFullscreen(innerEl);
            }
        },
    });

    if ( fullscreenEl ) {
        if ( tiny.isMobile ) {
            tarAddEventListener(fullscreenEl, 'touchstart', () => {
                toggleFullscreen(innerEl);
            });
        } else {
            tarAddEventListener(fullscreenEl, 'mousedown', () => {
                toggleFullscreen(innerEl);
            });
        }
    }

    function toggleFullscreen(el) {
        const fullscreenEnabled = ['fullscreenEnabled', 'webkitFullscreenEnabled', 'mozFullScreenEnabled', 'msFullscreenEnabled'].find(i=>document[i] !== undefined);
        if ( fullscreenEnabled && document[fullscreenEnabled] ) {
            const exitFullscreen = ['exitFullscreen', 'webkitExitFullscreen', 'webkitCancelFullScreen', 'mozCancelFullScreen', 'msExitFullscreen'].find(i=>document[`on${i}`] == null);
            const requestFullscreen = ['requestFullscreen', 'webkitRequestFullscreen', 'webkitRequestFullScreen', 'mozRequestFullScreen', 'msRequestFullscreen'].find(i=>el[`on${i}`] == null);
            playerFullscreen = document.fullscreenElement || document.fullscreen;

            if ( playerFullscreen ) {
                document[exitFullscreen]()
            } else {
                el[requestFullscreen]()
            }
        } else {
            `${tiny.i18n['No supported']}${tiny.i18n['Fullscreen']}`;
        }
    }
}