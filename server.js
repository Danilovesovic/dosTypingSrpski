var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(80,function(){
    console.log('Listening to port 80');
    
})