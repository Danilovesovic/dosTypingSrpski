$(function () {

    let textLength = 3;
    let fiveLetterWords = mmm.filter(e =>  e.length == textLength);
    let lvl = 5;
    let text = baWords.split("\n");
    // console.log(text);
    // for (var i = 0; i < text.length; i++) {
    //   console.log(i + " -- "+text[i]);
    // }
    let activeText = [];
    let speed = 1;
    let allLines = $('.line');
    let lineNumber = allLines.length;
    let time = 7000;
    let resultDiv = $('.display-result');


// let speedUp = setInterval(()=>{
//     textLength++;
//     text = mmm.filter(e => e.length == textLength);
//     time += 700;
// },20000)

  let mainInput = $('#main-input');
      mainInput.focus()

    mainInput.on('keyup',function(){
      let self = $(this);
        if(activeText.includes(this.value)){
          let index = activeText.indexOf(this.value);
          activeText.splice(index,1);
          console.log(activeText);
          $('span').filter(function () {
             return $(this).text() === self.val();
          }).css('background','skyblue').fadeOut(400,function(){
              $(this).remove();
              resultDiv.html(parseInt(resultDiv.html())+1)
          })
            mainInput.val("")
        }
    })

let moveAll =   setInterval(()=>{
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
    setTimeout(insertSpans,time);
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
    clearInterval(moveAll)
}
})
