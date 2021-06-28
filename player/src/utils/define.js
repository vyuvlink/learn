export const userAgent = window.navigator.userAgent.toLowerCase();
export const isAndroid = /android/.test(userAgent);
export const isIos = /mac os x/.test(userAgent);
export const isWeiXin = /micromessenger/.test(userAgent);
export const isMiniProgram = /miniprogram/.test(userAgent);
export const isSafari = /safari/.test(userAgent);

export const hasBlob = 'blob://';
export const hasHttp = 'http://';
export const hasHttps = 'https://';