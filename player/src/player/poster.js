import { query, loadImg, setStyle, addClass } from '../utils';

export default function(tiny) {
    let poster = tiny.ops.poster || tiny.ops.videoAttr && tiny.ops.videoAttr.poster;

    if ( poster ) {
        loadImg(poster,'video poster missing')
        .then(url=>{
            if (url) {
                let el = query('.tiny-poster', tiny.el);
                addClass(tiny.el, 'tiny-poster-show');
                setStyle(el, 'background-image', `url(${url})`);
            }
        })
        .catch(err=>(tiny.logger.warn=err, 0));
    }
}