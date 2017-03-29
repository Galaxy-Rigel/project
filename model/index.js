var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/huhui',function(err){
    if(err) throw err;
    console.log('connect MongoDB success');
});

// 画表结构
var userTB = new mongoose.Schema({
    username:String,
    phone:String,
    email:String,
    address:String,
    context:String,
    regTime:Date
});

var userDB = mongoose.model('user',userTB);
var UserExport = new Object();

UserExport.create = function(user,callback){
    userDB.create(user,function(err){
        callback(err);
    });
};

exports.User = UserExport;
