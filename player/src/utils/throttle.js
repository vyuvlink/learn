export const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

export const debounce = (fn, delay) => {
    let timer = 0;
    function fnc(...args) {
        if ( timer ) {
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            fn.call(this,...args);
        }, delay);
    }
    fnc.clearTimeout = function() {
      clearTimeout(timer);
    };
    return fnc;
}

export const throttle = (fn, delay) => {
    let isThrottled = true,
        timer = 0;

    return function(...args) {
        if ( isThrottled ) {
            if ( Date.now() - timer > delay ) {
                timer = Date.now();
                fn.call(this,...args);
            } else {
                isThrottled = false;
                setTimeout(()=>{
                    timer = Date.now();
                    isThrottled = true;
                    fn.call(this,...args);
                }, delay);
            }
        }
    }
}