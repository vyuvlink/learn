import poster from './poster';
import url from './url';
import events from './events';
import play from './play';
import time from './time';
import progress from './progress';
import fullscreen from './fullscreen';
import filp from './filp';
import rotate from './rotate';
import volume from './volume';
import scale from './scale';
import ratio from './ratio';
import rate from './rate';
import pip from './pip';
import subtitle from './subtitle';
import control from './control';
import loading from './loading';
import { playerAttrs } from '../config';
import { tarAddEventListener } from '..';

export default class Player {
    constructor(tiny) {
        
        playerAttrs.events.forEach(eventName => tarAddEventListener(tiny.player, eventName, e => tiny.emit(`video:${e.type}`, e)));

        poster(tiny);
        url(tiny);
        play(tiny);
        time(tiny);
        progress(tiny);
        fullscreen(tiny);
        volume(tiny);
        scale(tiny);
        filp(tiny);
        rotate(tiny);
        ratio(tiny);
        rate(tiny);
        pip(tiny);
        control(tiny);
        loading(tiny);
        subtitle(tiny);
        events(tiny);
    }
}
