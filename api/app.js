import path from 'path'
import fs from 'fs'
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
// import proxy from 'http-proxy-middleware'
import bodyParser from 'body-parser'
// import expressStaticGzip from 'express-static-gzip'
import compression from 'compression'

import router from './router/router'
import config from './config'

const app = express();
const proxy = require('http-proxy-middleware').createProxyMiddleware

//https
// const httpsOptions = {
// 	key: fs.readFileSync('.key'),
// 	cert: fs.readFileSync('.cert'),
// }

//跨域
app.all('*', (req, res, next) => {
	 var orginList = [
        "http://www.alibaba.com",
        "http://www.qq.com",
        "http://www.baidu.com"
    ]
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*"); //orginList
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
     //让options尝试请求快速结束
    if (req.method.toLowerCase() == 'options') {
    	res.sendStatus(200);
    } else {
    	next();	
    }
});

//proxy
// app.use('/', proxy({
// 	target: 'http://127.0.0.1:9096',
// 	changeOrigin: true,
// }));
// app.use('/', proxy({
//  target: 'http://192.168.88.3',
//  changeOrigin: true,
// }));

//view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs'); //jade

//config(必须在路由之前)
// const accessLog = fs.createWriteStream('./access.log', {flags : 'a'});
// app.use(logger('combined', {stream : accessLog})); //打印到log日志
app.use(logger('dev')); //打印到控制台
// app.use(logger());

//request
// app.use(express.json());
// app.use(express.urlencoded({
//   limit: '2mb', //上传最大2m
//   extended: false
// }));
app.use(bodyParser.urlencoded({
  limit: '100mb', //上传最大2m
  extended:false,
  uploadDir: './uploads'
}));
app.use(bodyParser.json());
// false = 表示使用系统模块querystring来处理，也是官方推荐的, true = 表示使用第三方模块qs来处理
// 从功能性来讲，qs比querystring要更强大，所以这里可以根据项目的实际需求来考虑

//服务器gzip压缩
app.use(compression())
// app.use('/public/', expressStaticGzip('public', {
//   customCompressions: [{
//     encodingName: "gzip",
//     fileExtension: "gz"
//   }]
// }))

//app router
router(app);

//cookie
app.use(cookieParser());

//public static
app.use(express.static(path.join(__dirname, 'public')));

//catch error
app.use((req, res, next) => {
	next(createError(404));
})

app.use((req, res, next) => {
	res.locals.messags = err.messag;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

const server = app.listen(config.runing.port, function(){
  const host = server.address().address;
  const port = server.address().port;

  console.log(`listening at ${config.runing.address}:${config.runing.port}`);
}, config.runing.address);