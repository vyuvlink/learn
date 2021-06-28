export const bubbleEl = function(el, className) {
    if ( !el || !el.classList || el === document.body || el === document ) {
        return document.body;
    }
    if ( hasClass(el, className) ) {
        return el;
    } else {
        return bubbleEl(el.parentNode, className);
    }
}

export function query(selector, context = document) {
    return typeof selector === 'string' &&  context.querySelector(selector) || selector;
}

export function queryAll(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

export function addClass(target, className) {
    return target.classList.add(className);
}

export function removeClass(target, className) {
    return target.classList.remove(className);
}

export function hasClass(target, className) {
    return target.classList.contains(className);
}

export function append(parent, child) {
    if (child instanceof Element) {
        parent.appendChild(child);
    } else {
        parent.insertAdjacentHTML('beforeend', String(child));
    }
    return parent.lastElementChild || parent.lastChild;
}

export function remove(child) {
    return child.parentNode.removeChild(child);
}

export function setStyle(elm, key, val) {
    elm.style[key] = val;
    return elm;
}

export function setStyles(elm, styles) {
    Object.keys(styles).forEach((key) => {
        setStyle(elm, key, styles[key]);
    });
    return elm;
}

export function getStyle(elm, key, numberType = true, isPseudo = '') {
    const val = window.getComputedStyle(elm, isPseudo ? isPseudo : null).getPropertyValue(key);
    return numberType ? parseFloat(val) : val;
}

export function sublings(target) {
    return [...target.parentElement.children].filter((item) => item !== target);
}

export function includeFromEvent(e, target) {
    return e.composedPath && e.composedPath().indexOf(target) > -1; // 元素冒泡 = [当前元素,...,body,html,document, Window]
}