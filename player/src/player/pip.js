import { def } from '../utils';

export default function(tiny) {
    const {
        player,
    } = tiny;

    let pip = 0;

    def(tiny, 'pip', {
        get() {
            return pip;
        },
        set(val) {
            
        }
    });
}
