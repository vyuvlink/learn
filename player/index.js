import TinyPlayer from './src';
import Flvjs from 'flv.js/src/flv.js';
import Hlsjs from 'hls.js';
const url = `http://${window.location.hostname}:3001/video/banzezhishu01.mp4`;
// const url = `http://${ window.location.hostname }:3001/video/banzezhishu01.flv`;
// const url = `http://${ window.location.hostname }:3001/video/banzezhishu01/index.m3u8`;
let flvJsEl, hlsJSEl;
const tinyPlayer = new TinyPlayer({
  el: '.tiny-player',
  url: url,
  // theme: '#f00',
  poster: `http://${window.location.hostname}:3001/img/1617173481718.jpg`, //图片加载失败也会触发error
  videoAttr: {
    crossOrigin: 'anonymous',
    // controlslist: 'nodownload nofullscreen noremoteplayback',
  },
  fullscreen: ['h5', 'full', 'default'],
  definition: [{
    name: '480P',
    url: url,
  }, {
    name: '720P',
    url: url,
  }, {
    name: '1080P',
    url: url,
  },],
  mixin: {
    'flv': (player, url) => {
      if (window.MediaSource) {
        flvJsEl = Flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          hasAudio: true,
          hasVideo: false,
          enableStashBuffer: true,
          url: url,
        });
        flvJsEl.attachMediaElement(player);
        flvJsEl.load();
        flvJsEl.play();
      } else {
        tiny.logger.err = '暂不支持FLV这种文件格式'
      }
    },
    'm3u8': (player, url) => {
      if (player.canPlayType('application/vnd.apple.mpegurl')) {
        const sourceEl = document.createElement('source');
        sourceEl.type = 'application/x-mpegURL';
        sourceEl.src = url;
        player.append(sourceEl);
      } else if (Hlsjs.isSupported()) {
        hlsJSEl = new Hlsjs()
        hlsJSEl.loadSource(url)
        hlsJSEl.attachMedia(player)
        hlsJSEl.on(Hlsjs.Events.MANIFEST_PARSED, () => {
          player.play();
        })
      } else {
        tiny.logger.err = '暂不支持M3U8这种文件格式'
      }
    },
    // 'mp4': (video, url) => {
    //    video.src = url;
    // },
  },
});

tinyPlayer.on('ready', (tiny) => {
  // console.log('tinyPlayer ready', tiny);
});

tinyPlayer.on('firstplay', () => {
  // console.log('tinyPlayer firstplay');
});

tinyPlayer.on('video:play', () => {
  console.log('tinyPlayer video:play');
});