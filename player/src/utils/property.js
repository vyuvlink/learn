const { hasOwnProperty } = Object.prototype;

export const def = Object.defineProperty;

export const hasOwn = (obj, name) => hasOwnProperty.call(obj, name);

export const proxyPropertys = (target, ...sources) => {
    return sources.reduce((result, source) => {
        Object.getOwnPropertyNames(source).forEach(key => {
            def(result, key, Object.getOwnPropertyDescriptor(source, key));
        });
        return result;
    }, target);
}

export const mergeDeep = (...o) => {
    const isObject = item => item && typeof item === 'object' && !Array.isArray(item);
    return o.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            } else if (isObject(pVal) && isObject(oVal) && !(oVal instanceof Element)) {
                prev[key] = mergeDeep(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
}

export const targetAddEventListener = (tar, name, cb, opt = {}) => (tar.addEventListener(name, cb, opt), () => tar.removeEventListener(name, cb, opt));