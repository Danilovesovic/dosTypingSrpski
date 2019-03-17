
const words = require('an-array-of-english-words')
const fs = require('fs');

fs.writeFileSync('myArray.txt',words.toString(),'utf8');