##Web标准

WEB标准不是某一个标准，而是一系列标准的集合。

网页主要由三部分组成：结构，表现和行为

1.结构（Structure）

结构化标准语言主要包括HTML和XHTML以及XML，在页面body里面我们写入的标签都是为了页面的结构。

①HTMLHTML英语意思是：Hypertext Marked Language，即超文本标记语言,使用HTML语言描述的文件，需要通过WWW浏览器显示出效果。是一种最为基础的语言。所谓超文本，因为它可以加入图片、声音、动画、影视等内容，因为它可以从一个文件跳转到另一个文件，与世界各地主机的文件连接。所谓标记，就是它采用了一系列的指令符号来控制输出的效果，这些指令符号用“<标签名字属性>”来表示。

②XHTMLXHTML是The Extensible HyperText Markup Language可扩展标识语言的缩写。XHTML是HTML向XML的一个过渡语言，它比HTML严谨性会高点，然后基本语言都还是沿用的HTML的标签，只不过废除了部分表现层的标签，同时在标准上要求高了点比如标签的严格嵌套，标签结束等等简单的说，建立XHTML的目的就是实现HTML向XML的过渡。

③XMLXML（eXtensible Markup Language）即可扩展标记语言，最初设计的目的是弥补HTML的不足，以强大的扩展性满足网络信息发布的需要，后来逐渐用于网络数据的转换和描述。XML是一种简单的数据存储语言，使用一系列简单的标记描述数据，而这些标记可以用方便的方式建立，虽然XML占用的空间比二进制数据要占用更多的空间，但XML极其简单易于掌握和使用。

2.表现（Presentation）表现标准语言主要包括CSS（Cascading Style Sheets）层叠式样式表，通过CSS样式表，W3C创建CSS标准的目的是以CSS取代HTML表格式布局、帧和其他表现的语言，通过CSS样式可以是页面的结构标签更具美感。

3.行为（Behavior）行为是指页面和用户具有一定的交互，同时页面结构或者表现发生变化，标准主要包括对象模型（如W3C DOM）、ECMAScript并要求这三部分分离。①DOMDOM是Document Object Model文档对象模型的缩写。DOM是一种与浏览器，平台，语言的接口，使得你可以访问页面其他的标准组件。简单理解，DOM解决了Netscaped的Javascript和Microsoft的Jscript之间的冲突，给予web设计师和开发者一个标准的方法，让他们来访问他们站点中的数据、脚本和表现层对像。②ECMAScriptECMAScript是ECMA(EuropeanComputer Manufacturers Association)制定的标准脚本语言（JAVAScript）

##W3C规范

W3C对web标准提出了规范化的要求，也就是在实际编程中的一些代码规范

1.对于结构的要求

1）标签字母要小写

2）标签要闭合

3）标签不允许随意嵌套

2.对于css和js的要求

1）尽量使用外链css样式表和js脚本。使结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验。

2）样式尽量少用行内样式表，使结构与表现分离，标签的id和class等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版。

3）不需要变动页面内容，便可提供打印版本而不需要复制内容，提高网站易用性。

##浏览器渲染

##浏览器内存分配

内存分配一般会比桌面应用少

##盒模型

IE盒子 box-sizing: border-box; w = p + b + w
w3c box-sizing: content-box;  w = w

##dispaly: inline,block,inline-block区别

inline行内:w与h设置无效

1.水平方向上根据direction依次布局 2.不会在元素前后进行换行 3.受white-space控制 4.margin/padding在竖直方向上无效，水平方向上有效 5.width/height属性对非替换行内元素无效，宽度由元素内容决定 6.非替换行内元素的行框高由line-height确定，替换行内元素的行框高由height,margin,padding,border决定 6.浮动或绝对定位时会转换为block 7.vertical-align属性生效

block块状:w与h有效,但w只会影响其显示,block占满一行的属性还在

1.处于常规流中时，如果width没有设置，会自动填充满父容器 2.可以应用margin/padding 3.在没有设置高度的情况下会扩展高度以包含常规流中的子元素 4.处于常规流中时布局时在前后元素位置之间（独占一个水平空间） 5.忽略vertical-align

inline-block行内块:w与h有效

##FOUC

无样式内容的闪存(Flash Of Unstyled Content)：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。

解决方法：把样式表放到文档的head

##FC布局

What‘s FC？一定不是KFC，FC的全称是：Formatting Contexts，是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

BFC(Block Formatting Contexts)直译为"块级格式化上下文"。Block Formatting Contexts就是页面上的一个隔离的渲染区域，容器里面的子元素不会在布局上影响到外面的元素，反之也是如此。如何产生BFC？float的值不为none。overflow的值不为visible。position的值不为relative和static。display的值为table-cell, table-caption, inline-block中的任何一个。那BFC一般有什么用呢？比如常见的多栏布局，结合块级别元素浮动，里面的元素则是在一个相对隔离的环境里运行。

IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同。 IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。那么IFC一般有什么用呢？水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是OK的，毕竟这俩在移动端才是王道。Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。

##var,let,const区别

声明const或者let的变量存在于构造func的[[Scopes]]中,而var声明的变量会存在于window中

声明const未定义报Missing initializer in const declaration错误

声明let和var未定义不报错,使用变量输出undefined

var有变量声明提升,let、const没有

var声明一个变量时，创建的这个属性是不可配置的，也就是说无法通过delete运算符删除,而直接声明一个变量可以通过delete运算符删除

var没有块级作用域,可以跨块访问,但是不能跨函数访问。let,const有块级作用域({}即块级作用域)

##重绘(Repaint)与回流(Reflow)

重绘(Repaint) —— 屏幕的一部分要重画，比如某个CSS的背景色变了。但是元素的几何大小没有变。

回流(Reflow) —— 意味着元素的几何大小变了，我们需要重新验证并计算Render Tree。是Render Tree的一部分或全部发生了变化。这就是Reflow，或是Layout。（HTML使用的是flow based layout，也就是流式布局，所以，如果某元元素的几何大小发生了变化，需要重新布局，也就叫reflow）reflow 会从这个root frame开始递归往下，依次计算所有的结点几何大小和位置，在reflow过程中，可能会增加一些frame，比如一个文本字符串必需被包装起来。

Reflow的成本比Repaint的成本高得多的多。DOM Tree里的每个结点都会有reflow方法，一个结点的reflow很有可能导致子结点，甚至父点以及同级结点的reflow。在一些高性能的电脑上也许还没什么，但是如果reflow发生在手机上，那么这个过程是非常痛苦和耗电的。
所以，下面这些动作有很大可能会是成本比较高的。

通常来说，如果在滚屏的时候，我们的页面上的所有的像素都会跟着滚动，那么性能上没什么问题，因为我们的显卡对于这种把全屏像素往上往下移的算法是很快。但是如果你有一个fixed的背景图，或是有些Element不跟着滚动，有些Elment是动画，那么这个滚动的动作对于浏览器来说会是相当相当痛苦的一个过程。你可以看到很多这样的网页在滚动的时候性能有多差。因为滚屏也有可能会造成reflow。

每改一次样式，它就reflow或repaint一次。一般来说，浏览器会把这样的操作积攒一批，然后做一次reflow，这又叫异步reflow或增量异步reflow。但是有些情况浏览器是不会这么做的，比如：resize窗口，改变了页面默认的字体，等。对于这些操作，浏览器会马上进行reflow。

##运算符

<,>,<=,>=的比较规则
所有比较运算符都支持任意类型，但是比较只支持数字和字符串

##cookie sessionstorage localstorage

存储有XSS注入的风险,不要存储系统中的敏感数据

在cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击

cookie:

一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效

大小4K左右

每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题

需要程序员自己封装，源生的Cookie接口不友好

localStorage/sessionStorage:

除非被清除，否则永久保存/仅在当前会话下有效，关闭页面或浏览器后被清除

大小一般为5MB

仅在客户端（即浏览器）中保存，不参与和服务器的通信

源生接口可以接受，亦可再次封装来对Object和Array有更好的支持

##css选择器

元素选择器 `*,E,#id,.class`

通配,标签,Id,类

关系选择器 `E F,E>F,E+F,E~F`

后代,子代,相邻,兄第

属性选择器

`E[att]`  选择具有att属性的E元素
`E[att="val"]`  选择具有att属性且属性值等于val的E元素
`E[att~="val"]` 选择具有att属性且属性值其中一个等于val的E元素（包含只有一个值且该值等于val的情况）
`E[att|="val"]` 选择具有att属性且属性值为以val开头并用连接符-分隔的字符串的E元素，如果属性值仅为val，也将被选择
`E[att^="val"]` 选择具有att属性且属性值为以val开头的字符串的E元素
`E[att$="val"]` 选择具有att属性且属性值为以val结尾的字符串的E元素
`E[att*="val"]` 选择具有att属性且属性值为包含val的字符串的E元素

伪类选择器

E:link  设置超链接a在未被访问前的样式
E:visited 设置超链接a在其链接地址已被访问过时的样式
E:hover 设置元素鼠标在其悬停时的样式
E:active  设置元素在被用户激活（在鼠标点击与释放之间发生的事件）时的样式
E:focus 设置元素在成为输入焦点（该元素的onfocus事件发生）时的样式。(一般应用于表单元素)
E:checked 匹配用户界面上处于选中状态的元素E。(用于input type为radio与checkbox时)
E:enabled 匹配用户界面上处于可用状态的元素E。(一般应用于表单元素)
E:disabled  匹配用户界面上处于禁用状态的元素E。(一般应用于表单元素)
E:empty 匹配没有任何子元素（包括text节点）的元素E
E:root  匹配E元素在文档的根元素。在HTML中，根元素永远是HTML
E:not(s)  匹配不含有s选择符的元素E
E:first-child 匹配父元素的第一个子元素E
E:last-child  匹配父元素的最后一个子元素E
E:only-child  匹配父元素仅有的一个子元素E
E:nth-child(n)  匹配父元素的第n个子元素E
E:nth-last-child(n) 匹配父元素的倒数第n个子元素E
E:first-of-type 匹配同类型中的第一个同级兄弟元素E
E:last-of-type  匹配同类型中的最后一个同级兄弟元素E
E:only-of-type  匹配同类型中的唯一的一个同级兄弟元素E
E:nth-of-type(n)  匹配同类型中的第n个同级兄弟元素E
E:nth-last-of-type(n) 匹配同类型中的倒数第n个同级兄弟元素E

伪对象选择器

E:before/E::before  在目标元素E的前面插入的内容。用来和content属性一起使用
E:after/E::after  在目标元素E的后面插入的内容。用来和content属性一起使用
E:first-letter/E::first-letter  设置元素内的第一个字符的样式
E:first-line/E::first-line  设置元素内的第一行的样式
E::placeholder  设置元素文字占位符的样式。(一般用于input输入框)
E::selection  设置元素被选择时的字体颜色和背景颜色

##css样式权重 (0,0,0,0模式)

!important>行内样式>ID选择器 > 类选择器 | 属性选择器 | 伪类选择器 > 元素选择器

!important, 权重:max;

行内样式, 权重:1000;

ID选择器, 权重:100;

class,属性选择器和伪类选择器, 权重:10;

标签选择器和伪元素选择器, 权重:1;

通配符, 权重:0;

##同源策略(Same-Origin-Policy)

同源:
URL由协议、域名、端口和路径组成，如果两个URL的协议、域名和端口相同，则表示他们同源。

同源策略:
浏览器的同源策略，限制了来自不同源的"document"或脚本，对当前"document"读取或设置某些属性。 （白帽子讲web安全[1]）
从一个域上加载的脚本不允许访问另外一个域的文档属性。

##跨域解决方案

1、 通过jsonp跨域(浏览器代实现,并且只实现get请求)
2、 document.domain + iframe跨域（两个页面都通过js强制设置document.domain为基础主域，就实现了同域）
3、 location.hash + iframe
4、 window.name + iframe跨域
5、 postMessage跨域
6、 跨域资源共享（CORS）
7、 nginx代理跨域
8、 nodejs中间件代理跨域
9、 WebSocket协议跨域

##URI、URN、URL

URI(Universal Resource Identifier 统一资源标志符): `http://www.123.com/index.html?a=1&b=2#c`

URN(Universal Resource Name 统一资源名称): `www.123.com/index.html?a=1&b=2#c`

URL(Universal Resource Locator 统一资源定位符): `http://www.123.com/index.html`

协议://用户名:密码@服务器:端口/地址;资源?参数#片段

语法`<scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<fragment>`

##获取内联样式

currentStyle属性和getComputedStyle属性不能设置属性,只能获取

currentStyle:该属性只兼容IE,不兼容火狐和谷歌

 写法:ele.currentStyle["attr"]或者ele.currentStyle.attr;

getComputedStyle:该属性是兼容火狐谷歌,不兼容IE

写法:window.getComputedStyle(ele,null)[attr]获取是window.getComputedStyle(ele,null).attr

在IE中获取到的颜色是16进制的,在火狐谷歌中获取的颜色是rgb模式的

##事件

事件模型: 捕获、冒泡

事件流: 

三个阶段：捕获阶段、目标阶段、冒泡阶段

DOM事件捕获的具体流程:

window => document => html => body => ... => 目标元素

Event 对象有哪些常用应用:

阻止默认事件：event.preventDefault()
阻止冒泡：event.stopPropagation()
阻止调用相同事件的其他侦听器(事件响应优先级)：event.stopImmediatePropagation()
当前绑定事件的元素：event.currentTarget
当前被点击的元素：event.target

事件监听和解绑的兼容写法:

var myEventUtil = {
    addEvent : function (ele,event,func) {
        //用能力检测进行跨浏览器兼容处理
        if(ele.addEventListener) {
            //false表示冒泡事件模型
            ele.addEventListener(event,func,false);
        }else if(ele.attachEvent){
            ele.attachEvent('on'+event,func);
        }else{
            ele['on'+event]=func;
        }
    },
    delEvent : function (ele,event,func) {
        if(ele.removeEventListener){
            ele.removeEventListener(event,func,false);
        }else if(ele.detachEvent){
            ele.detachEvent('on'+event,func);//IE
        }else {
            ele['on'+event]=null;
        }
    }
}

自定义事件:

var event = new Event('custome');
dom.addEventListener('custome', funcion () {});
dom.dispatchEvent(event);

##防抖与节流

想象每天上班大厦底下的电梯。把电梯完成一次运送，类比为一次函数的执行和响应。假设电梯有两种运行策略 throttle 和 debounce ，超时设定为15秒，不考虑容量限制。

节流

节流是规定时间内只能操作一次

throttle 策略的电梯。保证如果电梯第一个人进来后，15秒后准时运送一次，不等待。如果没有人，则待机。

let throttle = (func, wait) => {
    let context, args;
    let previous = 0;
    return function () {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    };
};

防抖

防抖就是那可以一直点,但是只执行最后一次

debounce 策略的电梯。如果电梯里有人进来，等待15秒。如果又人进来，15秒等待重新计时，直到15秒超时，开始运送。

let debounce = (func, wait) => {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args)
        }, wait);
    };
};

##AMD和CMD规范的区别

AMD在加载模块完成后会立即执行该模块，所有的模块都加载完成后执行require方法中的回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网速，谁先下载下来，谁先执行，但是我们的主逻辑一定是在所有的依赖模块都被加载完成后才执行。

CMD加载完某个模块的时候并不执行，只是把它们下载下来而已，在所有的模块下载完成后，当使用require请求某个模块的时候，才执行对应的模块。

##CommonJS

CommonJS 是以在浏览器环境之外构建 JavaScript 生态系统为目标而产生的项目，比如在服务器和桌面环境中。
出发点是为了解决 JavaScript 的痛点：

无模块系统（ES6 解决了这个问题）
包管理
标准库太少
...

CommonJS 模块的特点如下:

所有代码都运行在模块作用域，不会污染全局作用域。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
模块加载的顺序，按照其在代码中出现的顺序。
在 Node.js 模块系统中，每个文件都视为独立的模块。

CommonJS 规范本身涵盖了模块、二进制、Buffer、文件系统、包管理等内容，而 Node 正是借鉴了 CommonJS 规范的模块系统，自身实现了一套非常易用的模块系统。
CommonJS 对模块的定义可分为三部分：模块引用（require）、模块定义（exports、module.exports）、模块标识（require参数）。

##Node中的模块类型

核心模块:

built-in 模块：src 目录下的 C/CPP 模块。
native 模块：lib 目录下的模块，部分 native 模块底层调用了 built-in 模块，比如 buffer 模块，其内存分配是在 C/CPP 模块中实现的。

第三方模块：保存在 node_modules 目录下的非 Node 自带模块

文件模块：比如 require('./utils')，特点就是有绝对或者相对路径的文件路径

执行 node index.js
大概执行流程是 /src/node_main.cc --> /src/node.cc --> 执行node::LoadEnvironment()

##生产环境与开发环境之间的代码区别

开发环境：开发环境时程序猿们专门用于开发的服务器，配置可以比较随意，为了开发调试方便，一般打开全部错误报告和测试工具，是最基础的环境。开发环境的分支，一般是feature分支。
测试环境：一般是克隆一份生产环境的配置，一个程序在测试环境工作不正常，那么肯定不能把它发布到生产服务器上，是开发环境到生产环境的过度环境。测试环境的分支一般是develop分支，部署到公司私有的服务器或者局域网服务器上，主要用于测试是否存在bug，一般会不让用户和其他人看到，并且测试环境会尽量与生产环境相似。
生产环境： 生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志，是最重要的环境。部署分支一般为master分支。

##devDependencies和dependencies区别

使用 --save-dev 安装的 插件，被写入到 devDependencies 域里面去，而使用 --save 安装的插件，则是被写入到 dependencies 区块里面去。

devDependencies  里面的插件只用于开发环境，不用于生产环境，而 dependencies  是需要发布到生产环境的。

比如我们写一个项目要依赖于jQuery，没有这个包的依赖运行就会报错，这时候就把这个依赖写入dependencies;

而我们使用的一些构建工具比如glup、webpack这些只是在开发中使用的包，上线以后就和他们没关系了，所以将它写入devDependencies。

##模块化

为什么需要模块化: 前端开发和其他开发工作的主要区别，首先是前端是基于多语言、多层次的编码和组织工作，其次前端产品的交付是基于浏览器，这些资源是通过增量加载的方式运行到浏览器端，如何在开发环境组织好这些碎片化的代码和资源，并且保证他们在浏览器端快速、优雅的加载和更新，就需要一个模块化系统，这个理想中的模块化系统是前端工程师多年来一直探索的难题。

模块:

定义: 在模块化编程中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为模块。每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。 精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。

模块应该是职责单一、相互独立、低耦合的、高度内聚且可替换的离散功能块。

模块化: 

定义:模块化是一种处理复杂系统分解成为更好的可管理模块的方式，它可以把系统代码划分为一系列职责单一，高度解耦且可替换的模块，系统中某一部分的变化将如何影响其它部分就会变得显而易见，系统的可维护性更加简单易得。

模块化是一种分治的思想，通过分解复杂系统为独立的模块实现细粒度的精细控制，对于复杂系统的维护和管理十分有益。模块化也是组件化的基石，是构成现在色彩斑斓的前端世界的前提条件。

##FileReader

FileReader共有4种读取方法：
1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
2.readAsBinaryString(file)：将文件读取为二进制字符串
3.readAsDataURL(file)：将文件读取为Data URL
4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'

FileReader对象在读取文件后，还需要进行处理。为了不阻塞当前线程，API采用了事件模型，可以注册这些事件：
1.onabort：中断时触发
2.onerror：出错时触发
3.onload：文件成功读取完毕时触发
4.onloadend：文件读取完毕时触发，无论是否失败
5.onloadstart：文件开始读取时触发
6.onprogress：当文件读取时，周期性地触发

##ES5

1.strict模式
严格模式，限制一些用法，'use strict';

2.Array增加方法

增加了every、some 、forEach、filter 、indexOf、lastIndexOf、isArray、map、reduce、reduceRight方法

PS： 还有其他方法 Function.prototype.bind、String.prototype.trim、Date.now

3.Object方法
Object.create
Object.defineProperty
Object.defineProperties
Object.getOwnPropertyDescriptor
Object.keys
Object.getOwnPropertyNames
Object.getPrototypeOf
Object.preventExtensions / Object.isExtensible
Object.seal / Object.isSealed
Object.freeze / Object.isFrozen

##ES6特性

let, const, class, extends, super, arrow functions, template string, destructuring, default, rest arguments

##nginx

nginx -s signal

Where signal may be one of the following:

stop — fast shutdown
quit — graceful shutdown
reload — reloading the configuration file
reopen — reopening the log files

##vue懒路由(动态组件)

动态加载组件的四种方式：
1、使用import导入组件，可以获取到组件
var name = 'system';
var myComponent =() => import('../components/' + name + '.vue');
var route={
    name:name,
    component:myComponent
}

2、使用import导入组件，直接将组件赋值给componet
var name = 'system';
var route={
    name:name,
    component :() => import('../components/' + name + '.vue');
}

3、使用require 导入组件，可以获取到组件
var name = 'system';
var myComponent = resolve => require.ensure([], () => resolve(require('../components/' + name + '.vue')));
var route={
    name:name,
    component:myComponent
}

4、使用require 导入组件，直接将组件赋值给componet
var name = 'system';
var route={
    name:name,
    component(resolve) {
        require(['../components/' + name + '.vue'], resolve)
    }
}

## Virtual DOM的理解

## webpack 

配置 Webpack 的方式有如下两种：
1、根目录配置 ebpack.config
2、webpack--config webpackdev.config指定配置文件

• Entry ：配置模块的入口
• Output：配置如何输出最终想要的代码。
• Module ：配置处理模块的规则。
• Resolve ：配置寻找模块的规则．
• Plugins ：配置扩展插件。
• DevServer：配置 DevServer
• 其他配置项：其他零散的配置项。
• 整体配置结构：整体地描述各配置项的结构。
• 多种配置类型 ：配置文件不止可以返回一个 Object ，还可以返回其他形式。
• 配置总结：寻找配置 Webpack 的规律，减少思维负担

调试

Webpack 支持生成 Source Map ，只需在启动时带上一devtool source-map
参数。重启 DevServer 后刷新页面，再打开 Chrome 浏览器的开发者 具，就可以 Sources
栏中看到可调试的源代码了

模块热替换

启动 Dev Server 时带上一hot 参数

context

Webpack 在寻找相对路径的文件时会以 context 为根目录， context 默认为执行启动
Webpack 时所在的当前工作目录。如果想改变 context 的默认配置，则可以在配置文件里这
样设置它

module.exports = {
 context: path.resolve(＿dirname,'app')
}

webpack --context 来设置 context

###Entry

string './app/entry' 入口模块的文件路径，可以是相对路径
array  ['./app/entryl',' ./app/entry2'] 入口模块的文件路径，可以是相对路
object {a: './app/ entry-a', b: ['./app/entry-b','./app/entry-b']} 配置多个入口，每个入口生成 Chunk

如果是 array 类型,则搭配 output.library 配置项使用时，只有数组里的最后入口文件的模块 被导出

Chunk 的名称

Webpack 个生成的 Chunk 个名称， Chunk 的名称和 En町的配置有关。

如果 entry 是一个 string 或者 array ，就只会生成 Chunk ，这时 Chunk 的名 main 。

如果 entry 是一个 object ，就可能会出现多个 Chunk ，这时 Chunk 的名称是 object 键值对中键的名称。

配置动态 Entry

假如项目里有多个页面需要为每个页面的入口配置一个 Ent叩，但这些页面的数量可能会
不断增长，则这时 En 的配置会受到其他因素的影响，导致不能写成静态的值。其解决方法
是将 Entry 设置成一个函数动态地返回上面所说的配置，

// 同步函数
entry : () => {
  return {
    a : './pages/a',
    b :'./pages/b',
  }
};
//异步函数
entry: () => {
  return new Promise ((resolve)=>{
    resolve({
      a: './pages/a',
      b: './pages/b',
    });
  };
};

###Output 

filename: 
output.filename 配置输出文件的名称，为 string 类型。如果只有一个输出文件，则
可以将它写成静态不变的: filename :'bundle.js' 

但是在有多个 Chunk 要输出时，就需要借助模板和变量了。前面讲到， Webpack 会为每
Chunk 个名称，所以我们可以根据 Chunk 的名称来区分输出的文件名：filename: '[name].js'

变量名: 
id => Chunk 的唯 标识，从 0 开始
name => Chunk 的名称
bash => Chunk 的唯 标识的 Hash值
chunkhash => Chunk 内容的 Hash 值

hash 和 chunkhash 的长度是可指定的，[hash:8] 代表8位 Hash 值，默认20位。

注意， xtractTextWebpackPlugin 插件使用 contenthash 而不是 chunkhash 来代表哈希值，原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身，而不是由一组模块组成的 Chunk 。

##webpack loader 执行顺序

在 webpack 中每个资源都会有个 request，这个 request 类似于在 require('babel-loader?plugins[]=transform-es2015-arrow-functions!!script-loader!./a'); 中的 babel-loader?plugins[]=transform-es2015-arrow-functions!!script-loader!./a，只是它会把每个 module 都 require.resolve 一下成绝对路径。参考 loader-api/this.request。loader 的执行顺序完全是按照 request 的顺序来执行的，先从左到右 pitch，然后再从右到左 transform。所以 loader 的执行顺序关键就是看 request 是如何生成的。

1. 在配置文件 module.rules 中定义的 loader
module.rules 会先对该资源文件的所有符合条件的 loader 进行排序（按照 enforce，post loader 在最左边，pre loader 在最右边），然后转换成 request 的格式。有一点注意的是：对于 enforce: 'post' 的 loader 会在前面加上 !!，而 enforce: 'pre' 的 loader 会在前面加上 -!，其他的都是加 ! 了。

2. 在 require 中定义 loader
该方式 定义的顺序是确定的，webpack 不会改变该顺序，就算使用 !! 和 -! 也没用的，!! 和 -! 会被替换成 !。webpack 仅仅会去 require.resolve 每个 module，然后转换成 request。

3. 同时在配置文件 和 require 中定义的 loader
结果为：
在 require 中定义的 loader 的 request +
** 在配置文件 module.rules 中定义的 loader 的 request** +
resource

##transform与margin

transform是通过创建一个RenderLayers合成层，拥有独立的GraphicsLayers。每一个GraphicsLayers都有一个Graphics Context，其对应的RenderLayers会paint进Graphics Context中。合成器（Compositor）最终会负责将由Graphics Context输出的位图合并成最终屏幕展示的图案。

满足如下条件的RenderLayers，会被认为是一个独立的合成层：

有3D或者perspective transform的CSS属性的层
video元素的层
canvas元素的层
flash
对opacity和transform应用了CSS动画的层
使用了CSS滤镜（filters）的层
有合成层后代的层
同合成层重叠，且在该合成层上面（z-index）渲染的层

如果RenderLayer是一个合成层，那么它有属于它自己的单独的GraphicsLayer，否则它和它的最近的拥有GraphicsLayer的父layer共用一个GraphicsLayer。

由此可见，transform发生在Composite Layer这一步，它所引起的paint也只是发生在单独的GraphicsLayer中，并不会引起整个页面的回流重绘。

我们经常会听到GPU会加速渲染，那GPU在这里又扮演什么角色呢？

前面说到，合成器会负责将层合成绘制为最终的屏幕画面。在硬件加速体系结构，合成由GPU负责。在chrome浏览器多进程模型中，有一个专门的进程来负责传递Render进程的命令，即GPU进程。Render进程和GPU进程是通过共享内存传递的。

Render进程可以快速 的将命令发给命令缓冲区，并且返回到CPU密集的render活动中，留给GPU进程去处理这些命令。我们可以充分利用多内核机器上的GPU进程和CPU进程。这也是为什么GPU会加速渲染，使transform渲染速度更快的又一原因。

marign：外边距，定义元素周围的空间；简言之，可以改变元素的位移。在浏览器页面渲染的时候，margin可以控制元素的位置，也就是说，改变margin，就会改变render tree的结构，必定会引起页面layout回流和repaint重绘。

合成器的优点在于，其工作无关主线程，合成器线程不需要等待样式计算或者 JS 执行，这就是为什么合成器相关的动画 最流畅，如果某个动画涉及到布局或者绘制的调整，就会涉及到主线程的重新计算，自然会慢很多。

transform 比 margin性能好50%-70%

transform的局限性

transform实际上也是用到了GPU加速，也就是说占用了内存。由此可见创建GraphicsLayer，虽然洁身了layout，paint阶段，但Layer创建的越多，占用内存就会越大，而过多的渲染开销会超过性能的改善。

在使用css3 transtion做动画效果时，transform实现的动画是与合成器线程相关的，不需要等待主线程样式计算或者 JS 执行，计算速度是很快的；而使用height，width，margin和padding时，导致布局和绘制的调整，主线程需要重新计算样式并且执行JS，计算速度自然就慢了。

