var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('typings',['nicks']);
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/nicks',function(req,res){
    db.nicks.find().sort({wordNumber : -1}).limit(10,function(err,docs){
        console.log(docs);
        res.send(docs)
    })

})
app.get('/getAll',function(req,res){
    db.nicks.find().sort({wordNumber : -1},function(err,docs){
        console.log(docs);
        res.send(docs)
    })
})

app.post('/insertNick',function(req,res){
    db.nicks.insert({nick: req.body.nick,wordNumber: parseInt(req.body.wordCount)},function (err,docs) {
        if(err) console.log(err);
        res.send("Ok");
    })

})
app.listen(80,function(){
    console.log('Listening to port 80');

})
