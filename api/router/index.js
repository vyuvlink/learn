import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const wait = t => new Promise(resolve=>setTimeout(resolve, t));

const loadCss = fs.readFileSync(path.resolve('./public/stylesheet/load.css'))
const loadJs1 = fs.readFileSync(path.resolve('./public/javascripts/load1.js'))
const loadJs2 = fs.readFileSync(path.resolve('./public/javascripts/load2.js'))
const loadGif = fs.readFileSync(path.resolve('./public/img/1px.gif'))

router.get('/', (req, res, next) => {
	res.render('index');
	// res.json({
	// 	msg: '',
	// 	code: 200,
	// 	data: []
	// })
})

router.get('/load', async (req, res, next) => {
	// await wait(4e3);
	res.header("Content-Type", "text/css; charset=utf-8")
	res.end(loadCss)
})

router.get('/load1', async (req, res, next) => {
	// await wait(1000);
	res.end(loadJs1)
})

router.get('/load2', async (req, res, next) => {
	// await wait(1000);
	res.end(loadJs2)
})

router.get('/up', async (req, res, next) => {
	console.log(req.query)
	res.end(loadGif)
})


router.get('/hello', async (req, res, next) => {
	res.end('hello,world!')
})

// export default router;
module.exports = router;