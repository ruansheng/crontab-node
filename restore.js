//load database
var Datastore = require('nedb');

var exec = require('child_process').exec;
var fs = require('fs');

/**
* 获取backup的任务列表
*/
exports.crontabs = function(db_name, callback){
	var db = new Datastore({ filename: __dirname + '/crontabs/' + db_name });
	db.loadDatabase(function (err) {});
	db.find({}).sort({ created: -1 }).exec(function(err, docs){
		for(var i=0; i<docs.length; i++){
			docs[i].timestamp = format_date(new Date(docs[i].timestamp));
		}
		callback(docs);
	});
}

/**
* 删除backup文件
*/
exports.delete = function(db_name){
	fs.unlink(__dirname + '/crontabs/' + db_name);
}

