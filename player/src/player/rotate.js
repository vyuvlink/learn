import { tarAddEventListener } from '..';
import { query, def, setStyle } from '../utils';

export default function(tiny) {
    const {
        el,
        player,
    } = tiny;

    let rotate = 0;
    const rotateEl = query('.tiny-rotate', el);

    if ( rotateEl ) {
        def(tiny, 'rotate', {
            get() {
                return rotate;
            },
            set(val) {
                rotate = Math.floor((val%360)/90) * 90;
                steRotate(val);
            }
        });

        function steRotate() {
            setStyle(
                player, 
                'transform', 
                `rotate(${ tiny.rotate }deg) 
                 scale(${ rotate%180 == 0 ? tiny.filp.filpX : tiny.filp.filpX * tiny.scale },
                       ${ rotate%180 == 0 ? tiny.filp.filpY : tiny.filp.filpY * tiny.scale })`
            );
        }
    } else {
        def(tiny, 'rotate', {   
            get() {
                return rotate;
            }
        });
    }
}
