import express from 'express';
import multiparty from 'multiparty';

const router = express.Router();

router.post('/file', (req, res, next) => {
	const form = new multiparty.Form({
		uploadDir: './uploads' // 指定文件存储目录
	})
  form.parse(req) // 将请求参数传入，multiparty会进行相应处理
  form.on('field', (name, value) => { // 接收到数据参数时，触发field事件
    console.log('field =>', name, value)
  })
  form.on('file', (name, file) => { // 接收到文件参数时，触发file事件
    console.log('file =>', name, file)
  })
  form.on('close', () => {  // 表单数据解析完成，触发close事件
    console.log('表单数据解析完成')
  })
	res.json({
		msg: '',
		code: 200,
		data: null
	})
})

export default router;