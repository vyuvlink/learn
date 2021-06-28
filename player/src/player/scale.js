import { def } from '../utils';

export default function(tiny) {
    const {
        player,
    } = tiny;

    const getScaleValue = () => {
        const { videoWidth, videoHeight } = player;
        return videoWidth > videoHeight ? videoHeight / videoWidth : videoWidth / videoHeight;
    };

    let scale = 0;

    def(tiny, 'scale', {
        get() {
            return scale;
        },
        set(val) {
            if ( !!val ) {
                scale = getScaleValue()
            }
        }
    });
}
