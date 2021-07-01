import db from '../db';
import User from '../dao/user';
import ErrCode from '../util/ErrorCode';
import Results from '../util/Results';

export default class UserServices {

	constructor() {
		this.Results = new Results()
	}

	async getAllUser() {
		await new Promise((resolve, reject) => {
			reject('未知错误')
			//  db.exec("select * from user",function(err, results, fields){
			//  	if (err) {
			//  		reject(err)
			//  	}
			//  	resolve(results)
			// })
		})
		.then(res=>{
			this.Results.setData = res.map(i=>{
				const u = new User()
				u.setName = i.username
				u.setId = i.id
				return u.toString()
			})
		})
		.catch(err=>{
			this.Results.setCode = ErrCode.Unkown_Error
			this.Results.setMsg = err
		})

		return this.Results.toJson()
	}
}