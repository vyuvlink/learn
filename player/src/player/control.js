import { tarAddEventListener } from '..';
import { def, addClass, removeClass, query } from '../utils';

export default function (tiny) {
	const {
		el,
		player,
	} = tiny;

	let control = true,
		time = 5000,
		timerId = 0;

	const controlEl = query('.tiny-player-controls', el);

	def(tiny, 'control', {
		get() {
			return control;
		},
		set(val) {
			control = val;
			if (control) {
				addClass(tiny.el, 'tiny-player-bottom-show');
				if (player.paused) {
					clearTimeout(timerId);
				} else {
					clearTimeout(timerId);
					timerId = setTimeout(() => {
						control = false;
						removeClass(el, 'tiny-player-bottom-show');
						removeClass(el, 'tiny-progress-tips-show');
						tiny.emit('control', control);
					}, time);
				}
				tiny.emit('control', true);
			} else {
				removeClass(el, 'tiny-player-bottom-show');
				removeClass(el, 'tiny-progress-tips-show');
				tiny.emit('control', false);
			}
		},
	});

	if (tiny.isMobile) {
		tarAddEventListener(el, 'touchstart', () => {
			tiny.control = true
		})
	} else {
		tarAddEventListener(el, 'mousemove', (e) => {
			tiny.control = true
		})
		tarAddEventListener(el, 'mouseout', (e) => {
			if (!player.paused) {
				tiny.control = false
			}
		})
	}
}
