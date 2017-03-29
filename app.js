var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    db = require('./model/index'),
    list = require('./model/data');

var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/userInfo',function(req,res){
    var userInfo = req.body;
    console.log(userInfo);
    userInfo.regTime = new Date();
    db.User.create(userInfo,function(err){
        if(err){
            res.send({isSuccess:false,err:err});
        }else{
            res.send({isSuccess:true});
        }
    });
});

app.get('/api/list',function(req,res){
    res.send(list);
});

app.use(function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port,function(err){
    if(err){
        throw err;
    }
    console.log('server is starting at port:%d',port);
});