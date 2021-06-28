import { def, setStyle, query } from '../utils';

export default function(tiny) {
    const {
        el,
        player,
    } = tiny;

    let ratio = 'default';


    const innerEl = query('.tiny-player-inner', el);

    def(tiny, 'ratio', {
        get() {
            return ratio;
        },
        set(val) {
            if ( ['default', '4:3', '16:9'].indexOf(val) > -1 && val != ratio ) {
                ratio = val;
                if (ratio === 'default') {
                    setStyle(player, 'width', null);
                    setStyle(player, 'height', null);
                    setStyle(player, 'padding', null);
                } else {
                    const ratioArray = ratio.split(':');
                    const { videoWidth, videoHeight } = player;
                    const { clientWidth, clientHeight } = innerEl;
                    const videoRatio = videoWidth / videoHeight;
                    const setupRatio = ratioArray[0] / ratioArray[1];
                    if (videoRatio > setupRatio) {
                        const percentage = (setupRatio * videoHeight) / videoWidth;
                        setStyle(player, 'width', `${percentage * 100}%`);
                        setStyle(player, 'height', '100%');
                        setStyle(player, 'padding', `0 ${(clientWidth - clientWidth * percentage) / 2}px`);
                    } else {
                        const percentage = videoWidth / setupRatio / videoHeight;
                        setStyle(player, 'width', '100%');
                        setStyle(player, 'height', `${percentage * 100}%`);
                        setStyle(player, 'padding', `${(clientHeight - clientHeight * percentage) / 2}px 0`);
                    }
                }

                // notice.show = `${i18n.get('Aspect ratio')}: ${ratio === 'default' ? i18n.get('Default') : ratio}`;
                tiny.emit('ratio', ratio);
            }
        }
    });
}
