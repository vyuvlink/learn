import { tinyAttrs } from '../config';
import { query, intersection, addClass, vttToBlob, assToVtt, getUrlPostfix } from '../utils';
import Vtt from '../../subtitle.vtt';
import Ass from '../../subtitle.ass';

function Utf8ArrayToStr(array) {
  let out = "", i = 0, len = array.length, c, char2, char3;

  while (i < len) {
    c = array[i++];
    switch (c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                                   ((char2 & 0x3F) << 6) |
                                   ((char3 & 0x3F) << 0));
        break;
    }
  } 
  return out;
}

// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
         bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export default class Mounted {
    constructor(tiny) {
        let { el, 
                ops: { use, videoAttr },
            } = tiny,
            playerUseAttr = intersection(use, tinyAttrs.player),
            videoAttrStr = Object.keys(videoAttr)
                           .map(i=>Boolean(videoAttr[i])&&i!=='poster'?`${i}="${videoAttr[i]}"`:'')
                           .join(' ');

        el.innerHTML = this.inner(playerUseAttr, videoAttrStr);
        addClass(el, 'tiny-play-show');
        tiny.player = query('.tiny-player-inner video', el);
        fetch(Ass)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(buffer); // Utf8ArrayToStr(new Uint8Array(buffer))

            switch (getUrlPostfix(Ass)) {
                case 'srt':
                    return vttToBlob(srtToVtt(text));
                case 'ass':
                    return vttToBlob(assToVtt(text));
                case 'vtt':
                    return vttToBlob(text);
                default:
                    return url;
            }
        })
        .then((subtitleUrl)=>{
            // download(subtitleUrl, '天气之子.vtt')
            const el = query('track', tiny.player);
            const {
                src
            } = el;
            if ( src ) {
                URL.revokeObjectURL(src);
            }
            el.src = subtitleUrl;
        })
    }

    // <track src="${Vtt}" kind="metadata" srclang="jp" label="English" />

    // kind 取值
    // captions    该轨道定义将在播放器中显示的简短说明。
    // chapters    该轨道定义章节，用于导航媒介资源。
    // descriptions    该轨道定义描述，用于通过音频描述媒介的内容，假如内容不可播放或不可见。
    // metadata    该轨道定义脚本使用的内容。
    // subtitles    该轨道定义字幕，用于在视频中显示字幕。

    // srclang = language_code 轨道的语言，若 kind 属性值是 "subtitles"，则该属性必需的。

    // label = 轨道的标签或标题。

    inner(useAttr, attr) {
        let innerStr = `
            <div class="tiny-player-outer"></div>
            <div class="tiny-player-inner">
                <video ${attr}>
                    <track default kind="metadata"/>
                </video>
                <div class="tiny-custom"></div>
                <div class="tiny-subtitle"></div>
                <div class="tiny-player-bottom">
                    <div class="tiny-progress">
                        <div class="tiny-progress-inner">
                            <div class="tiny-progress-loaded"></div>
                            <div class="tiny-progress-played"></div>
                            <div class="tiny-progress-highlight"></div>
                            <div class="tiny-progress-tips"></div>
                            <div class="tiny-progress-indicator"></div>
                        </div>
                    </div>
                    <div class="tiny-player-controls">
                        <div class="tiny-controls-left">
                            <div class="tiny-play"></div>
                            <div class="tiny-time"></div>
                        </div>
                        <div class="tiny-controls-right">
                            <div class="tiny-volume"></div>
                            <div class="tiny-definition"></div>
                            <div class="tiny-rotate"></div>
                            <div class="tiny-fullscreen"></div>
                        </div>
                    </div>
                </div>
                <div class="tiny-loading">
                    <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
                </div>
                <div class="tiny-notice">
                    <div class="tiny-notice-inner"></div>
                </div>
                <div class="tiny-poster"></div>
            </div>
        `;

        return innerStr;
    }
}
