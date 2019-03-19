$(function () {
displayWinners();
let startBtn = $('.startBtn');
let nickNameDiv = $('.nickname');
let saveScore = $('#save-score');
let startAgain = $('#start-again');
let winnerScores = $('.winner-scores');
let inputForNick = $('#inputForNick')
let wordCount = 0;
// EVENTS
    startBtn.on('click',function(){     
        startGame()
    })
    saveScore.on('click',function(){
        let nick;
        if(inputForNick.val() != ""){
            nick = inputForNick.val();
        }   else{
            nick = "Guest";
        }     
        $.ajax({
            url: "/insertNick",
            method: "post",
            data : {
                nick : nick,
                wordCount: wordCount
            }
        })
        .done(function(res){
            console.log(res);  
            // location.reload();
        })
        .fail(function(){
            console.log('fail');
            
        })
        .always(function(){
            console.log("Always");
            
        })
    })
    startAgain.on('click',function(){
        location.reload()
    })
    function startGame(){
        startBtn.hide();
        nickNameDiv.hide()

    let textLength = 3;
    let fiveLetterWords = mmm.filter(e =>  e.length == textLength);
    let lvl = 5;
    // let text = baWords.split("\n");
    let text = fiveLetterWords;
    let gameEnd = false;
    let activeText = [];
    let speed = 10;
    let allLines = $('.line');
    let lineNumber = allLines.length;
    let time = 7000;
    let resultDiv = $('.display-result');


let speedUp = setInterval(()=>{
    textLength++;
    text = mmm.filter(e => e.length == textLength);
    time += 700;
},20000)

  let mainInput = $('#main-input');
      mainInput.focus()

    mainInput.on('keyup',function(){
      let self = $(this);
        if(activeText.includes(this.value)){
          let index = activeText.indexOf(this.value);
          activeText.splice(index,1);
          $('span').filter(function () {
             return $(this).text() === self.val();
          }).css('background','skyblue').fadeOut(100,function(){
              $(this).remove();
              wordCount++;
              resultDiv.html(parseInt(resultDiv.html())+1)
          })
            mainInput.val("")
        }
    })

let moveAll = setInterval(()=>{
      $('span').animate(
          {
              left: '+='+speed
          }
          , 10,function () {
              if($(this).position().left > 850){
                clearAllIntervals();
              }
          })
  },100)

function insertSpans() {
    for (let i = 0; i < lineNumber; i++) {
        const line = $(allLines[i]);

        let rand = Math.floor(Math.random() * 20);
        if (rand <= lvl) {
            let text = chooseText();
            line.append('<span>' + text + '</span>')
        }
    }
    if(!gameEnd){
        setTimeout(insertSpans, time);
    }
}
insertSpans()

function chooseText() {
    let rand = Math.floor(Math.random()*text.length);
    let forReturn = text[rand];
    activeText.push(forReturn);
    text.splice(rand,1);
    return forReturn;
}

function clearAllIntervals() {
    clearInterval(moveAll);
    gameEnd = true;
    nickNameDiv.show()
}
    }

    function displayWinners(){
        
            $.ajax({
                url : "/nicks",
            })
            .then(function(res){
                res.forEach((e,i) => {
                    winnerScores.append(`<p><kbd>${i + 1}</kbd> ${e.nick} (${e.wordNumber})</p>`)
                })
                
            })
        
    }
})