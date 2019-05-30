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

app.post('/storeNewResult',function(req,res){
    if(req.body.sub === 'yee'){
        // preko forme
         db.nicks.insert({nick: req.body.inputForNick,wordNumber: parseInt(req.body.fw)},function (err,docs) {
        if(err) console.log(err);
        res.redirect('http://dostyping.com');
    })
    }else{
        res.redirect('http://dostyping.com');
    }



})
app.listen(80,function(){
    console.log('Listening to port 80');

})
