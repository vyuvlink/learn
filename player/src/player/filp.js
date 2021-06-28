import { tarAddEventListener } from '..';
import { query, def, setStyle } from '../utils';

export default function(tiny) {
    const {
        el,
        player,
    } = tiny;

    let filpX = 0, filpY = 0;
    const filpEl = query('.tiny-filp', el);

    if ( filpEl ) {
        def(tiny, 'filp', {
            get() {
                return {
                    filpX: filpX == 0 ? 1 : -1,
                    filpY: filpY == 0 ? 1 : -1,
                };
            },
            set(val) {
                // 0 or false = 00, 1 = 01, 2 = 10, 3 = 11
                [filpY, filpX] = ('0' + (Number(val)%4 || 0).toString(2)).slice(-2);
                steFilp();
            }
        });

        function steFilp() {
            setStyle(
                player, 
                'transform', 
                `rotate(${ tiny.rotate }deg) 
                 scale(${ tiny.rotate%180 == 0 ? tiny.filp.filpX : tiny.filp.filpX * tiny.scale },
                       ${ tiny.rotate%180 == 0 ? tiny.filp.filpY : tiny.filp.filpY * tiny.scale })`
            );
        }
    } else {
        def(tiny, 'filp', {
            get() {
                return filp;
            }
        });
    }
}
