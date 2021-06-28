import { def, query } from '../utils';

export default function(tiny) {
    const {
        el,
        player,
    } = tiny;

    let subtitle = '';
    const subtitleEl = query('.tiny-subtitle', el);

    def(tiny, 'subtitle', {
        get() {
            return subtitle;
        },
        set(val) {
            if ( !!val ) {
                subtitle = val;
                subtitleEl.innerHTML = subtitle;
                console.log('subtitleEl.innerHTML change =>', subtitle)
            }
        }
    });

    player.textTracks[0].addEventListener('cuechange', function () {
        if ( player.textTracks && player.textTracks[0] && player.textTracks[0].activeCues && player.textTracks[0].activeCues[0] ) {
            tiny.subtitle = player.textTracks[0].activeCues[0].text
                            .split(/\r?\n/)
                            .map((item) => `<p>${item}</p>`)
                            .join('');
        }
    });
}
