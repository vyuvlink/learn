import { sleep, addClass } from '../utils';

export default function(tiny) {
    const {
        el,
        player,
    } = tiny;

    let isFirst = true,
        retryTimes = 0;
        
    const maxTimes = 2;

    setTimeout(()=>{
        tiny.emit('ready', tiny);
    }, 0);

    tiny.on('video:canplay', () => {
        tiny.loading = false;
        if ( isFirst ) {
            isFirst = false;
            tiny.currentTime = Math.floor(player.currentTime) || 0;
            tiny.scale = true;
            addClass(el, 'tiny-player-bottom-show');
            tiny.emit('firstplay', tiny);
        } else {
            tiny.emit('canplay', tiny);
        }
    });

    tiny.on('video:play', () => {
        tiny.paused = false;
        tiny.control = true;
        tiny.emit('play');
    });

    tiny.on('video:pause', () => {
        tiny.paused = true;
        tiny.control = true;
        tiny.emit('pause');
    });

    tiny.on('video:error', () => {
        if (retryTimes < maxTimes) {
            sleep(1000)
            .then(() => {
                retryTimes += 1;
            });
        } else {
            tiny.emit('error');
        }
    });

    tiny.on('video:timeupdate', () => {
        tiny.currentTime = Math.floor(player.currentTime) || 0;
        tiny.playedProgress = Math.floor( player.currentTime / player.duration*10000 ) / 100;
        tiny.loadedProgress = Math.round( ( player.buffered.length ? player.buffered.end( player.buffered.length - 1) : 0 ) / player.duration*10000 ) / 100;
        tiny.emit('timeupdate');
    });

    tiny.on('video:waiting', () => {
        tiny.loading = true;
    });


    tiny.on('video:seeked', () => {
        tiny.loading = false;
    });

    tiny.on('video:seeking', () => {
        tiny.loading = true;
    });

    tiny.on('video:loadstart', () => {
        tiny.loading = true;
    });
}