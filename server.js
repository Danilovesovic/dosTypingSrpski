var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('typings',['nicks']);
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/nicks',function(req,res){
    db.nicks.aggregate([{
        $sort : {wordNumber : -1}
    }],function(err,docs){
        res.send(docs)
    })
})

app.post('/insertNick',function(req,res){
    db.nicks.insert({nick: req.body.nick,wordNumber: parseInt(req.body.wordCount)}),function (err,docs) {
        if(err) console.log(err);
        console.log('No errors');
        
        res.send("Ok")
    }})
    
})

app.listen(80,function(){
    console.log('Listening to port 80');
    
})