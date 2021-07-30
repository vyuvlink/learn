// ssh-keygen -t rsa -C "your_email@youremail.com"
// cat ~/.ssh/id_rsa.pub

// git reset --hard <commit_id>
// git push origin HEAD --force

// git 获取最近一次提交的commit id
// 获取完整commit id（如：14123c8877e6ebdc220e205d92fc70feaf06dab1）

// git rev-parse HEAD
// 获取short commit id（如：14123c8）

// git rev-parse --short HEAD

// git reset --hard HEAD^         回退到上个版本
// git reset --hard HEAD~3        回退到前3次提交之前，以此类推，回退到n次提交之前
// git reset --hard commit_id     退到/进到 指定commit的sha码

// onclick=""
// :data-clipboard-text="copyText"
// new clipboard(copyElm)
// copyElm.click();

// new Date().toLocaleString('cn',{hour12: false})

//下划线转小驼峰
// 'a_b'.map(i=>i.replace(/_[a-z]/g,_=>_[1].toUpperCase())) //aB

// css 溢出省略号

// overflow: hidden;
// text-overflow:ellipsis;
// white-space: nowrap;

// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 3;
// overflow: hidden;

// 环引用 var b={},a={b};b.a = a;

// Object.getOwnPropertyDescriptors(obj)		 //返回目标对象内所有的属性名称
// Object.getOwnPropertyDescriptor(obj, prop)   //返回目标对象内属性名称
// Object.getOwnPropertyNames(obj)   			 //返回自身的可枚举和不可枚举属性的名称
// Object.getOwnPropertySymbols(obj) 			 //返回 Symbol 属性的对象
// Object.getPrototypeOf(object)				 //返回原型的对象
// Object.defineProperty(obj, prop, descriptor) //定义对象的prop属性监听
// Reflect.ownKeys(obj)  					     //返回目标对象内所有的属性名称，Reflect.ownKeys可以拿到Symbol属性

// qs.stringify实际上是把obj转化为key1=value1&key2=value2的形式

// ajax => express
// post fd(FormData) 			  done(需要库支持)
// post {}(FormData) 			  done(string)
// post qs.stringify(FormData)   done(string)
// post JSON.stringify(FormData) fail(key=obj,无法解析)

// fetch => express
// post fd(FormData) 			  done(需要库支持)
// post {}(FormData) 			  fail(key=obj,无法解析)
// post qs.stringify(FormData)   done(string)
// post JSON.stringify(FormData) fail(key=obj,无法解析)

// axios => express
// post fd(FormData) 			  done(需要库支持)
// post {}(FormData) 			  done(后台需要开启CORS, 可解析出number)
// post qs.stringify(FormData)   done(string)
// post JSON.stringify(FormData) fail(key=obj,无法解析)

// fetch => spring
// post {}(FormData) 			  fail
// post qs.stringify(FormData)   done
// post JSON.stringify(FormData) fail(key=obj,无法解析)

// ajax => spring
// post {}(FormData) 			  done
// post qs.stringify(FormData)   done
// post JSON.stringify(FormData) fail(key=obj,无法解析)

// axios => spring
// post {}(FormData) 			  fail
// post qs.stringify(FormData)   done
// post JSON.stringify(FormData) fail(key=obj,无法解析)

const cutTimeSecond = (val) => {
	const supp0 = (arr,str) => arr.map(i=>i<10?`0${i}`:i).join(!!str?str:'-');
	let t = !!new Date(val).getTime() ? new Date(val) : new Date(String(val).replace(/-/g,'/'));
	return supp0([t.getFullYear(),t.getMonth() + 1,t.getDate()]) + ' ' + supp0([t.getHours(),t.getMinutes()],':');
}

//数据流分页
//i = 页数,n = 总页数,offset = 偏移量
function getPagenations(i, n, offset = 1) {
	if (n < offset * 2 + 2) {
		return getSection2Array(1, n)
	} else {
		return (1 + (i - offset > 2 && ',···,' || ',') +
			getSection2Array(i > n && n - offset || i - offset > 2 && i - offset || 2, i + offset < n - 1 && i + offset || n - 1) +
			(i + offset < n - 1 && ',···,' || ',') + n).split(',')
	}
}

// 普通闰年：公历年份是4的倍数的，一般是闰年（如2004年就是bai闰年）。
// 世纪闰年：公历年份是整百数的，必须是400的倍数才是闰年（如1900年不是世纪闰年，2000年是世纪闰年）。
// 对于数值很大的年份：这年如果能被3200整除，并且能被172800整除则是闰年。如172800年是闰年，86400年不是闰年（因为虽然能被3200整除，但不能被172800整除）。

// ISO 8601定义包含当年第一个星期四的那一周是第一个星期。 基于这个定义，下列的属性有相互的等价性：
// 第一周至少有4天在1月里面。
// 该年的“第一天”是最靠近该年1月1日的星期一。
// 第一个星期最早是12月29日至1月4日，最晚是1月4日至1月10日。
// 如果1月1日和星期六与星期日不是工作日，1月4日就会是第一个工作日。
// 如果1月1日是星期一、二、三、或四，它就是第一周，如果1月1日是星期五，它就是去年度的第53周；如果是星期六，它是去年第52周的一部分（如果上一年是格里历的闰年，它就是第53周的一部分）；如果是星期日，它是去年第52周的部分。
const weekCount = time => {
	const leapYear = year => (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
	const now = new Date(time || Date.now()),
		year = now.getFullYear(),
		month = now.getMonth(),
		day = now.getDate(),
		days = [0, 31, leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		isFirst = false,
		dayCount = days.slice(0, month + 1).reduce((a, b) => a + b),
		specialDay = new Date(`${year}/01/01`).getDay(),
		firstWeekDay = specialDay > 0 ? (isFirst ? 7 : 8) - specialDay : (isFirst ? -1 : 1),
		count = dayCount + day - firstWeekDay;

	return Math.ceil(count / 7) + (firstWeekDay > 2 ? 1 : 0);
}

//获取距离当天/指定日期的前N天数据
function getBeforeNDay2Today(n, date) {
	let data = [];
	for (let i = !!date ? n + Math.floor((new Date().getTime() - new Date(date).getTime()) / 86400000) : n; i > 0; i--) {
		let d = new Date(new Date().getTime() - i * 86400000);
		data.push({
			md: `${supp0(d.getMonth() + 1)}月${supp0(d.getDate())}日`,
			ymd: `${d.getFullYear()}-${supp0(d.getMonth() + 1)}-${supp0(d.getDate())}`,
		});
	}
	return data;
}

//获取某年某月的天数
function getTodayDate(year, month) {
	if (/^(1|3|5|7|8|10|12)$/.test(month)) {
		return 31
	} else if (/^(4|6|9|11)$/.test(month)) {
		return 30
	} else if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 && year % 3200 != 0) || year % 172800 == 0) {
		return 29
	} else {
		return 28
	}
}

// 防抖
const debounce = (fn, delay) => {
	let timer = 0;
	function fnc(...args) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.call(this, ...args);
		}, delay);
	}
	fnc.clearTimeout = function () {
		clearTimeout(timer);
	};
	return fnc;
}

// 节流
const throttle = (fn, delay) => {
	let isThrottled = true,
		timer = 0;
	return function (...args) {
		if (isThrottled) {
			if (Date.now() - timer > delay) {
				timer = Date.now();
				fn.call(this, ...args);
			} else {
				isThrottled = false;
				setTimeout(() => {
					timer = Date.now();
					isThrottled = true;
					fn.call(this, ...args);
				}, delay);
			}
		}
	}
}

const loadImg = (url, errMsg, needFileReader = false) => {
	return new Promise((resolve, reject) => {
		if (needFileReader && window.FileReader) {
			const filereaderFnc = (blob) => {
				const filereader = new FileReader();
				filereader.readAsDataURL(blob);
				filereader.onload = () => {
					const img = new Image();
					img.src = filereader.result;
					img.onload = () => resolve(img);
					img.onerror = () => reject(errMsg);
				};
				filereader.onerror = () => reject(errMsg);
			}
			if (fetch) {
				fetch(url)
					.then(byte => byte.blob())
					.then(blob => filereaderFnc(blob))
					.catch(() => reject(errMsg));
			} else {
				const xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.open("get", url, true);
				xhr.send(null);
				xhr.onreadystatechange = () => {
					if (xhr.readyState === 4) {
						if (xhr.status == 200) {
							filereaderFnc(new Blob([xhr.response ? xhr.response : xhr.responseText], { type: xhr.getResponseHeader('content-type') }));
						} else {
							reject(errMsg);
						}
					}
				}
			}
		} else {
			const img = new Image();
			img.src = url;
			img.onload = () => resolve(img);
			img.onerror = () => reject(errMsg);
		}
	});
}

function verify(val, type, params) {
	const isEmpty = (v1, v2) => !!v1 && v1.length ? false : '请输入' + v2
	const minLength = (v1, v2, v3) => v1.length >= (!!v2 && v2 || 6) ? false : v3 + '长度不能少于' + (!!v2 && v2 || 6) + '位'
	const maxLength = (v1, v2, v3) => v1.length <= (!!v2 && v2 || 18) ? false : v3 + '长度不能超过' + (!!v2 && v2 || 18) + '位'
	const isMoblie = (v) => /^1[0-9]{10}$/.test(v) ? false : '手机号码格式不正确'
	const isEqual = (v1, v2, v3) => v1 == v2 ? false : v3 + '两次输入不一致'
	const isEmail = (v) => !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) && '邮箱格式不正确'
	let flag, arr = type.split(',').map((i) => {
		return {
			[i.indexOf(':') > -1 ? i.split(':')[0] : i]: i.indexOf(':') > -1 ? i.split(':')[1] : null
		}
	}).reduce((prev, cur) => {
		Object.assign(prev, cur)
		return prev;
	}, {})
	if (!!arr['max'] && +arr['max'] < +arr['min']) {
		console.error('最短限制长度必须小于最大限制长度！');
	}
	flag = isEmpty(val, arr['isEmpty'] || '') ||
		!!arr['min'] && minLength(val, arr['min'], arr['isEmpty'] || '') ||
		!!arr['max'] && maxLength(val, arr['max'], arr['isEmpty'] || '') ||
		!!arr['isEqual'] && isEqual(val, params, arr['isEqual'] || arr['isEmpty'] || '') ||
		(!!arr['isEmail'] || arr['isEmail'] === null) && isEmail(val, arr['isEmail'] || arr['isEmpty'] || '') ||
		arr['isMoblie'] === null && isMoblie(val),
		arr = null;
	return typeof flag === 'string' ? flag : false
}

const memoizer = function (memo, fundamental) {
	const shell = function (n) {
		let result = memo[n];
		if (typeof memo[n] !== 'number') {
			result = fundamental(shell, n);
			memo[n] = result;
		}
		return result;
	}
	return shell;
}

const fibonacci = memoizer([0, 1], function (shell, n) {
	return shell(n - 1) + shell(n - 2);
});

const factorial = memoizer([1, 1], function (shell, n) {
	return n * shell(n - 1);
});

function checkIsMounted(dom, callback) {
	if (dom) {
		if (callback && typeof callback === 'function') {
			callback()
		}
	} else {
		setTimeout(() => {
			checkIsMounted(dom, callback)
		}, 50)
	}
}

function checkIsBool(bool, callback) {
	if (typeof bool !== 'function') {
		return;
	}
	const b = bool()
	if (b) {
		if (callback && typeof callback === 'function') {
			callback(b)
		}
	} else {
		setTimeout(() => {
			checkIsBool(bool, callback)
		}, 50)
	}
}

function bezier(point, t) {
	let n = point.length, x = 0, y = 0;
	while (n--) {
		x += ((1 - t) ** n) * ((n == point.length - 1 || n == 0) ? 1 : san(point.length - 1, n)) * (t ** (point.length - n - 1)) * point[point.length - n - 1].x
		y += ((1 - t) ** n) * ((n == point.length - 1 || n == 0) ? 1 : san(point.length - 1, n)) * (t ** (point.length - n - 1)) * point[point.length - n - 1].y
	}
	return [x, y]
}

function getFrame(ms, rate = 1) {
	return 4 / ms * rate
}

function requestFrame(cb) {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	)(cb);
}

function getRandom(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

function getAngle(r) {
	return r / 180 * Math.PI
}

const getAddrData = (p, s, q) => {
	let si = 0, qi = 0, pi = 0;

	let id = q[0].id.slice(0, 4)
	let ids = s[0].id.slice(0, 2)
	const arr = [[]]
	const brr = [[]]
	const o = {}

	const run = () => {
		const pid = s[pi].id.slice(0, 2)
		const sid = s[pi].id.slice(0, 4)

		if ( ids !== pid ) {
			ids = s[pi].id.slice(0, 2)
			brr[++qi] = []
		}

		const obj = {
			label: s[pi].fullname,
			value: s[pi].id,
			children: []
		}

		if ( !o[sid] ) {
			o[sid] = obj
		}

		brr[qi].push(obj)

		pi++;
	}

	while ( ids < 14 ) {
		run()
	}

	q.forEach((i) => {
		const qid = i.id.slice(0, 4)

		if ( pi < s.length ) {
			run()
		}

		if ( id !== qid ) {
			if ( o[id] ) {
				o[id].children = arr[si]
			}

			id = i.id.slice(0, 4)
			arr[++si] = []
		}

		arr[si].push({
			label: i.fullname, 
			value: i.id
		})
	});

	return p.map((i, n)=>({
		label: i.name, 
		value: i.id, 
		children: brr[n], 
		children: brr[n] && brr[n][0].value.slice(-2) > 0 ? [{
			label: i.name, 
			value: String(+i.id + 100),
			children: brr[n]
		}] : brr[n]
	}))
}

function initScrollingfonts() {
  if ( state.scrollingfonts.length > 1 ) {
    let height = Math.floor(0.6 * root.remToPxRate),
        elms = scrollingfontsElm.value,
        len = state.scrollingfonts.length + 1,
        isLast = false,
        speed = 2000,
        slidingSpeed = 500;

    scrollingfontsElm.value.parentNode.style['height'] = `${ height }px`;
    scrollingfontsElm.value.parentNode.style['line-height'] = `${ height }px`;

    clearTimeout(state.scrollingfontsTimerId);
    const swiperLoop = (index) => {
      state.scrollingfontsTimerId = setTimeout(()=>{
        elms.style.transitionDuration = index == 0 ? '0ms' : `${slidingSpeed}ms`;
        elms.style.transform = `translate3D(0, ${-height * index}px, 0)`;
        if ( index < len - 1 ) {
          isLast = false;
          swiperLoop(index+1);
        } else {
          isLast = true;
          swiperLoop(0);
        }
      }, index == 1 || isLast ? speed/2 : speed);
    }

    swiperLoop(0);
  }
}

const useBullets = () => {
	let timerId = 0

	const clearBulletTime = clearInterval(timerId)

	const Bullets = (props) => {
		const { min = 20, max = 280, block = 20, num = 5, time = 1000, data = [] } = props
		const bulletRef = useRef(null)
		const d = (max - min) / num, limit = 2500, arr = [...Array(num)].fill(0)
		const datas = num > data.length ? data.concat([...Array(num-data.length)].map(i=>data[Math.floor(data.length * Math.random())])) : data

		useEffect(()=>{
			const els = [...bulletRef.current.children]
			timerId = setInterval(()=>{
				els.forEach(el=>{
					const elw = (el ? el.offsetWidth : 0)
					const w = parseInt(el.style.transform.match(/\d+/)) || 0
					if ( w < window.innerWidth + elw ) {
						el.style.transform = `translateX(-${w+1}px)`
					} else {
						el.style.top = min + (max - block) * Math.random() + 'px'
						el.style.transform = null
					}
				})
			}, 15)
		}, [])

		return (
			<div className="bullet-wrap" ref={bulletRef}>
				{datas.map((i, n)=><div className='item'>{i}</div>)}
			</div>
		)

	}

	return { Bullets, clearBulletTime }
}