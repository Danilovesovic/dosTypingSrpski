$(function () {
    displayWinners();
    let startBtn = $('.startBtn');
    let nickNameDiv = $('.nickname');
    let saveScore = $('#save-score');
    let startAgain = $('#start-again');
    let winnerScores = $('.winner-scores');
    let inputForNick = $('#inputForNick');
    let clearScreen = $('.clear-screen');
    let languageDivs = $('.language');
    let wordCount = 0;
    // EVENTS //////////////

    // add selected to laguage

    languageDivs.on('click',function(){
        languageDivs.removeClass('selected');
        $(this).addClass('selected');
    })

    startBtn.on('click', function () {
        startGame()
    })

    $("#finish_form").submit( function(eventObj) {
        $('[type="submit"]').attr('value','yee');
        $('<input />').attr('type', 'hidden')
            .attr('name', "fw")
            .attr('value', wordCount)
            .appendTo(this);
        return true;
    });

    startAgain.on('click', function () {
        location.reload()
    })
    // EVENTS END //////////////

    function startGame() {
        languageDivs.hide()
        startBtn.hide();
        nickNameDiv.hide()
        let language = $('.selected').html();
        
        let textLength = 3;
        let srpski = srpskeReci.split("\n");
        // let fiveLetterWords = mmm.filter(e => e.length == textLength);
        // let fiveLetterWords = srpski.filter(e => e.length == textLength);
        let fiveLetterWords = (language == 'en') ? mmm.filter(e => e.length == textLength) : srpski.filter(e => e.length == textLength)
        let lvl = 6; // default level je 6
        let text = fiveLetterWords;
        let gameEnd = false;
        let activeText = [];
        let speed = 9; //default 1
        let allLines = $('.line');
        let lineNumber = allLines.length;
        let time = 7000;
        let resultDiv = $('.display-result');


        let speedUp = setInterval(() => {
            textLength++;
            // text = mmm.filter(e => e.length == textLength);
            text = (language == 'en') ? mmm.filter(e => e.length == textLength) : srpski.filter(e => e.length == textLength)
            time += 700;
        }, 20000)

        let mainInput = $('#main-input');
        mainInput.focus()

        mainInput.on('keyup', checkInputTypings)
        function checkInputTypings() {
            let self = $(this);
            if (activeText.includes(this.value)) {
                let index = activeText.indexOf(this.value);
                activeText.splice(index, 1);
                if (activeText.length == 0) {
                    clearScreen.fadeIn(500).fadeOut(300)
                }
                $('span').filter(function () {
                    return $(this).text() === self.val();
                }).css('background', 'skyblue').fadeOut(100, function () {
                    $(this).remove();
                    wordCount++;
                    resultDiv.html(parseInt(resultDiv.html()) + 1)
                })
                mainInput.val("")
            }
        }

        let moveAll = setInterval(() => {
            let allSpans = $('span');
            allSpans.css(
                {
                    left: '+=' + speed
                }
            )
            $.each(allSpans, function (i, e) {
                if ($(e).position().left > 850) {
                    clearAllIntervals();
                } else if ($(e).position().left > 700 && $(e).position().left < 710) {
                    $(e).addClass('danger')
                }
            })
         
        }, 100)

        function insertSpans() {
            for (let i = 0; i < lineNumber; i++) {
                const line = $(allLines[i]);

                let rand = Math.floor(Math.random() * 20);
                if (rand <= lvl) {
                    let text = chooseText();
                    line.append('<span>' + text + '</span>')
                }
            }
            if (!gameEnd) {
                setTimeout(insertSpans, time);
            }
        }
        insertSpans()

        function chooseText() {
            let rand = Math.floor(Math.random() * text.length);
            let forReturn = text[rand].toLowerCase();
            activeText.push(forReturn);
            text.splice(rand, 1);
            return forReturn;
        }

        function clearAllIntervals() {
            clearInterval(moveAll);
            clearInterval(speedUp)
            mainInput.off('keyup', checkInputTypings)
            gameEnd = true;
            if (localStorage.nick) {
                inputForNick.val(localStorage.nick)
            }
            nickNameDiv.show()
        }
    }

    function displayWinners() {
        if (localStorage.nick) {
            $.ajax({
                url: '/getAll',
                method: 'get'
            })
                .done(function (res) {
                    let index = res.map(e => e.nick).indexOf(localStorage.nick);
                    if (index != -1) {
                        index++;
                        first10(index);
                    } else {
                        first10(null)
                    }

                })
        } else {
            first10(null)
        }

        function first10(index) {

            $.ajax({
                url: "/nicks",
            })
                .then(function (res) {
                    res.forEach((e, i) => {
                        winnerScores.append(`<p><kbd>${i + 1}</kbd> ${e.nick} (${e.wordNumber})</p>`)
                    })
                    if (index) {
                        winnerScores.append(`<p> ... </p>`)
                        winnerScores.append(`<p><kbd>${index}</kbd> ${localStorage.nick}`)
                    }
                })
        }
    }
})
