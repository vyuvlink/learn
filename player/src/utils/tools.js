export const sup0 = (n) => n < 10 ? `0${n}` : n;

export const msToTime = (ms, format = 'h:m:s') => {
    let o = {
        h: Math.floor(ms/3600),
        m: Math.floor(ms%3600/60),
		M: Math.floor(ms%3600/60),
        s: Math.floor(ms%60),
    };

    return (format.indexOf('M') > -1 && ms < 3600 ? format.replace('h:','') : format).split(':').map(i=>sup0(o[i])).join(':')
}

export const prefixStr = (str, start, end) => String(str).slice(start, end)

export const prefixHas = (s1, s2) => s1.slice(0, s2.length) === s2;

export const betweenWith = (min,val,max) => val <= min ? min : val >= max && max || val;

export const getUrlPostfix = (str) => String(str.split(/\?|#|&/).slice(0,1)[0].match(/[a-zA-Z0-9]+$/));

export const isMoutend = (is, callback, time = 1000) => {
	let timer = Math.floor(time/50),
		timerId = setInterval(()=>{
		if ( is && callback && typeof callback === 'function' ) {
			clearInterval(timerId)
			callback()
		}
		if ( timer-- < 0 ) {
			clearInterval(timerId)
		}
	}, 50)
}

export const loadImg = (src, errMsg) => {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.src = src;
		img.onload = () => resolve(src);
		img.onerror = () => reject(errMsg);
	});
}

export const boolVal = (val) =>  typeof val === 'object' && (Array.isArray(val) && val.length || Object.keys(a).length) || !!val;

export const union = (a,b) => new Set([...a, ...b]);

export const intersection = (a,b) => { const c = new Set(b); return a.filter(x => c.has(x)); }

export const difference = (a,b) => { const c = new Set(b); return a.filter(x => !c.has(x)); }

export const sortBy = (arr, key) => arr.sort((a,b)=>{
	if ( key ) {
		let [c,d] = [a[key].toLowerCase(), b[key].toLowerCase()];
		if (c < d) return -1;
		if (c > d) return 1;
		return 0;
	} else {
		let [c,d] = [a.toLowerCase(), b.toLowerCase()];
		if (c < d) return -1;
		if (c > d) return 1;
		return 0;
	}
});

window.sortBy = sortBy;

// export const download = (content, fileName) => {
//   const blob = new Blob([content]);
//   const a = document.createElement("a");
//   const url = window.URL.createObjectURL(blob);
//   const filename = fileName;
//   a.href = url;
//   a.download = filename;
//   a.click();
//   window.URL.revokeObjectURL(url);
// }

export const download = (url, name) => {
    const elink = document.createElement('a');
    elink.style.display = 'none';
    elink.href = url;
    elink.download = name;
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
}