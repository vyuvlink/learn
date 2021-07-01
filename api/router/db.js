import express from 'express'
import UserServices from '../services/UserServices'
const router = express.Router();

router.get('/user', async (req, res, next) => {
	res.json(await new UserServices().getAllUser())
})

router.get('/classify', (req, res, next) => {
	res.json({})
})


export default router;