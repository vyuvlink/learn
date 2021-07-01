import config from './config';
import mysql from 'mysql';

const isPool = 1;
const db = {};
// const pool = mysql.createPool({
// 	...config.db,
// 	queueLimit: 0 // 队伍中等待连接的最大数量，0为不限制。
// });
// const connection = mysql.createConnection(config.db);

// if ( isPool ) {
// 	pool.getConnection(function (err, con) {
// 		if (err) {
// 			console.log(err)
// 		} else {
// 			db.con = con;
// 		}
// 	});

// 	db.exec = function (sql, params, callback) {
// 		if (params === null || params.length == 0) {
// 			db.con.query(sql, function (err, results, fields) {
// 				db.con.release();
// 				callback(err, results, fields);
// 			})
// 		} else {
// 			db.con.query(sql, params, function (err, results, fields) {
// 				db.con.release();
// 				callback(err, results, fields);
// 			})
// 		}
// 	}

// 	db.end = function() {
// 		pool.end();
// 	}

// 	//当一个回掉压入队伍等待连接的时候触发入队事件
// 	// pool.on('enqueue',function(){
// 	// 　　console.log('入队');
// 	// });
// } else {
// 	//打开连接
// 	connection.connect(function (err) {
// 	    if (err) {
// 	        console.log(`mysql connection err: ${err}\n`);
// 	        return;
// 	    }
// 	    console.log('mysql connection connect succeed!');
// 	});

// 	// 查询数据
// 	db.exec = function(sql, params, callback) {
// 		if (params === null || params.length == 0) {
// 			connection.query(sql, function (error, results, fields) {
// 				callback(error, results, fields);
// 			});
// 		} else {
// 			connection.query(sql, params, function (error, results, fields) {
// 				callback(error, results, fields);
// 			});
// 		}
// 	}

// 	db.end = function() {
// 		//关闭连接
// 		connection.end(function (err) {
// 		    if (err) {
// 		        return;
// 		    }
// 		    console.log('mysql connection close succeed!');
// 		});
// 	}
// }

export default db;