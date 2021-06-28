import { tarAddEventListener } from '..';
import { queryAll, setStyle, addClass, removeClass, def, sortBy, bubbleEl, betweenWith, msToTime, getStyle } from '../utils';

export default function(tiny) {
    const {
        el,
        player,
    } = tiny;

    let playedProgress = 0,
        loadedProgress = 0,
        currProgress = 0,
        playerOffsetX = 0,
        playerOffsetY = 0,
        isTouch = false,
        playerOffsetLeft = getOffsetLeft(tiny.el);

    const [
        progressEl,
        indicatorEl,
        loadedEl,
        playedEl,
        progressTipsEl,
    ] = sortBy(queryAll([
        '.tiny-progress',
        '.tiny-progress-indicator',
        '.tiny-progress-loaded',
        '.tiny-progress-played', 
        '.tiny-progress-tips',
    ], el), 'className');

    def(tiny, 'playedProgress', {
        get() {
            return playedProgress;
        },
        set(val) {
            setPercentage('play', val)
        },
    });

    def(tiny, 'loadedProgress', {
        get() {
            return loadedProgress;
        },
        set(val) {
            setPercentage('load', val)
        },
    });

    def(tiny, 'currProgress', {
        get() {
            return currProgress;
        },
        set(val) {
            currProgress = val;
            setPercentage('play', val)
        },
    });

    if ( progressEl ) {
        if ( tiny.isMobile ) {
            tarAddEventListener(progressEl, 'touchstart', (e)=>{
                addClass(el, 'tiny-progress-tips-show');
                setProgressTips(e);
                isDroging(e);
                player.currentTime = getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * player.duration;
            })

            tarAddEventListener(document, 'touchmove', (e)=>{
                if ( isTouch ) {
                    isDroging(e);
                    tiny.currProgress = Math.floor( getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * 10000 ) / 100;
                }
            })

            tarAddEventListener(document, 'touchend', (e)=>{
                if ( isTouch ) {
                    isTouch = false;
                    player.currentTime = getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * player.duration;
                }
                // removeClass(el, 'tiny-progress-tips-show')
            })

            tarAddEventListener(document, 'touchcancel', (e)=>{
                if ( isTouch ) {
                    isTouch = false;
                    player.currentTime = getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * player.duration;
                }
                // removeClass(el, 'tiny-progress-tips-show')
            })

            tarAddEventListener(progressEl, 'touchend', (e)=>{
                player.currentTime = getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * player.duration;
            })

            tarAddEventListener(progressEl, 'touchcancel', (e)=>{
                player.currentTime = getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * player.duration;
            })
        } else {
            tarAddEventListener(progressEl, 'mousedown', (e)=>{
                player.currentTime = getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * player.duration;
                isDroging(e, 1);
            })

            tarAddEventListener(document, 'mousemove', (e)=>{
                if ( isTouch ) {
                    isDroging(e)
                    tiny.currProgress = Math.floor( getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * 10000 ) / 100;
                    addClass(el, 'tiny-progress-tips-show')
                    setProgressTips(e)
                }
            })

            tarAddEventListener(document, 'mouseup', (e)=>{
                if ( isTouch ) {
                    isTouch = false;
                    player.currentTime = getPosValue(bubbleEl(e.target, 'tiny-progress'), e).progress * player.duration;
                    removeClass(el, 'tiny-progress-tips-show')
                }
                if ( e.target === progressTipsEl ) {
                    removeClass(el, 'tiny-progress-tips-show')
                }
            })

            tarAddEventListener(progressEl, 'mousemove', (e)=>{
                addClass(el, 'tiny-progress-tips-show')
                setProgressTips(e)
            })

            tarAddEventListener(progressEl, 'mouseout', (e)=>{
                removeClass(el, 'tiny-progress-tips-show')
            })
        }
    }
    
    function setPercentage(type, percentage) {
        switch (type) {
            case 'play':
                if ( isTouch ) {
                    setStyle(playedEl, 'width', `${currProgress}%`);
                    setStyle(indicatorEl, 'width', `${currProgress}%`);
                } else {
                    if ( playedProgress != percentage ) {
                        playedProgress = percentage;
                        currProgress = percentage;
                        setStyle(playedEl, 'width', `${playedProgress}%`);
                        setStyle(indicatorEl, 'width', `${playedProgress}%`);
                    }
                }
                break;
            case 'load':
                loadedProgress = percentage;
                setStyle(loadedEl, 'width', `${loadedProgress}%`);
                break;
            default:
                break;
        }
    }

    function setProgressTips(e, msg) {
        const { offsetX, progress } = getPosValue(bubbleEl(e.target, 'tiny-progress'), e);
        progressTipsEl.innerHTML = msg || msToTime(Math.floor( progress * player.duration ), 'h:M:s');
        const tipswidth = progressTipsEl.clientWidth;

        if (offsetX <= tipswidth / 2) {
            setStyle(progressTipsEl, 'left', 0);
        } else if (offsetX > progressEl.clientWidth - tipswidth / 2) {
            setStyle(progressTipsEl, 'left', `${progressEl.clientWidth - tipswidth}px`);
        } else {
            setStyle(progressTipsEl, 'left', `${offsetX - tipswidth / 2}px`);
        }
    }

    function getPosValue(el, e) {
        const { top, left } = el.getBoundingClientRect(),
              {
                pageX,
                clientX,
                targetTouches,
                changedTouches
              } = e,
              offsetX = (pageX || clientX || targetTouches && targetTouches[0] && (targetTouches[0].pageX || targetTouches[0].clientX) || changedTouches && changedTouches[0] && (changedTouches[0].pageX || changedTouches[0].clientX) || 0) - left;

        if ( !isTouch ) {
            playerOffsetX = betweenWith(0, offsetX + playerOffsetLeft, el.clientWidth);
            playerOffsetY = top;
        }

        return {
            offsetX: betweenWith(0, offsetX, el.clientWidth),
            offsetY: top,
            progress: betweenWith(0, offsetX / el.clientWidth, 1),
        }
    }

    function isDroging(e, isHand) {
        let {
            pageX,
            clientX,
            pageY,
            clientY,
        } = e, x = pageX || clientX, y = pageY || clientY,
        w = getStyle(indicatorEl, 'width', 1, ':after'),
        h = getStyle(indicatorEl, 'height', 1, ':after');

        if ( 
            x > playerOffsetX - w &&
            x < playerOffsetX + w &&
            y > playerOffsetY - h &&
            y < playerOffsetY + h || isHand
         ) {
            isTouch = true;
        }
    }

    function getOffsetLeft(dom) {
        let left = 0, el = dom;
        while(el.parentNode) {
            left += el.offsetLeft;
            el = el.parentNode;
        }
        return left;
    }
}
