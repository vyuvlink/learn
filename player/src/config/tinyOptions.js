import { isSafari } from '../utils';

export const tinyOptions = {
	type: 'mp4',
	theme: '#2196f3',
	fullscreen: ['default'],
	use: [
		'time',
		'progress',
		'fullscreen',
		'volume',
		'lang',
		'theme',
	],
	videoAttr: {
		muted: true,
		controls: false,
		autoplay: false,
		preload: isSafari ? 'auto' : 'metadata',
		crossOrigin: 'anonymous',
		playsinline: true,
		'webkit-playsinline': true,
		'x5-video-player-type': 'h5',
		'x5-video-player-fullscreen': true,
		'x5-video-orientation': 'landscape|portrait',
	},
	lang: window.navigator.language.toLowerCase(),
}