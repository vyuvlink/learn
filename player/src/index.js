import './style/index.scss';
import * as Utils from './utils';
import { tinyOptions } from './config';
import Logger from './common/logger';
import Init from './common/init';
import Emitter from './common/emitter';
import Notice from './common/notice';
import I18n from './common/i18n';
import Mounted from './common/mounted';
import Player from './player';

let id = 0;
const destroyArr = [];
const instances = [];
const tarAddEventListener = (tar, name, cb) => destroyArr.push(Utils.targetAddEventListener(tar, name, cb));

export { tarAddEventListener };

export default class TinyPlayer extends Emitter {
	constructor(options) {
		super();

		this.ops = Utils.mergeDeep(tinyOptions, options);
		this.el = Utils.query(this.ops.el);
		this.logger = new Logger();
		this.notice = new Notice(this);
		this.i18n = new I18n(this);
		this.tinyCheckTerminal()
			.then(() => {
				Utils.removeClass(this.el, 'tiny-poster-show');
				this.playing = true;
				window.tiny = this;
			})

		if (this.el instanceof Element) {
			new Init(this);
			new Mounted(this);
			new Player(this);

			this.url = this.ops.url;
			this.theme = this.ops.theme;
			this.id = id++;
			instances.push(this);
		} else {
			this.logger.err = 'container element not found';
		}
	}

	static get instances() {
		return instances;
	}

	static get version() {
		return '0.0.1';
	}

	tinyCheckTerminal(flag) {
		return new Promise((resolve, reject) => {
			if (destroyArr.length) {
				destroyArr.forEach(i => i());
				destroyArr.length = 0;
			}
			if (!flag) {
				let touchTimer = 0;
				this.el.ontouchstart = () => {
					touchTimer = Date.now()
				};
				this.el.onclick = () => {
					if (touchTimer != 0) {
						this.isMobile = true;
					} else {
						this.isMobile = false;
					}
					this.el.ontouchstart = null;
					this.el.onclick = null;
					resolve()
				};
			} else if (flag === 1) {
				resolve(this.isMobile = 1);
			} else if (flag === -1) {
				resolve(this.isMobile = 0);
			}
		})
	}

	destroy(saveDom = false) {
		if (saveDom) {
			this.el.classList.add('tiny-destroy')
		} else {
			destroyArr.forEach(i => i());
			destroyArr.length = 0;
			this.el.innerHTML = '';
		}
		this.emit('destroy');
	}
}