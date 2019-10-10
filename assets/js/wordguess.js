// GLOBAL VARIABLES
//=================================================================

 var currentWord = [];
 var keyword;
 var generateNumber;
 var randNum;
 var randWord;
 var rightWord = [];
 var wrongWord = [];
 var unknownLetters;
 var underscore = [];
 var underscores;
 var words;
 var losses = 0;



// MAIN
// ==================================================================




 // GET the list of words from api
  function getArrOfWords(){
   fetch('http://app.linkedin-reach.io/words')
  .then(res => (res.text())) // get the response back in text
  .then(data => words = data.split(/\r|\n/)) // turn the response into an array of words
  .then(words => this.generateRandomWord())
  .then(() => this.generateUnderScore())
  .then(()  => this.keypressHandler())
}

getArrOfWords();

  // generate a random word from the array of words
  function generateRandomWord() {
      randNum = Math.floor(Math.random() * words.length);
      randWord = words[randNum];
      // currentWord.push(randWord)
      unknownLetters = Array.from(randWord);

   }

// make underscores for the length of the word
  function generateUnderScore() {
       underscore = [];
       for (var i = 0; i < unknownLetters.length; i++) {
           underscore[i] = "_";
           var underscores = document.getElementById('underscore')
           underscores.innerHTML = underscore.join(' ')

         }

  };


  // listen for keypress
   // determine if key press is the correct letter or not
   // push into the correct array of wrong or right guesses
  function keypressHandler(){
    {
    document.addEventListener('keyup', (event) => {

        keyword = String.fromCharCode(event.which)
       for (var i = 0; i < unknownLetters.length; i++) {
    if ( unknownLetters[i] === keyword) {
       underscore[i] = keyword;
       var underscores = document.getElementById('underscore')
        underscores.innerHTML = underscore.join(' ')
        rightWord.push(keyword)
        var displayRightMessage =document.getElementById("message")
        displayRightMessage.innerHTML = 'Corrrect!';
        var displayrightGuesses =document.getElementById("rightGuess")
        displayrightGuesses.innerHTML = 'Right Guesses:' + '  ' + [... new Set(rightWord)].join('');
  }
  if (unknownLetters.indexOf(keyword) < 0){
    wrongWord.push(keyword);
    var displayWrongGuesses =document.getElementById("wrongGuess")
    var displayWrongMessage =document.getElementById("message")
    displayWrongMessage.innerHTML = 'Incorrect, please try again!';
    displayWrongGuesses.innerHTML = 'Wrong Guesses:' + '  ' + wrongWord.join('');
    losses -= 1
    console.log(wrongWord)
    var fail = document.getElementById('attempts')
    fail.innerHTML = losses

      }
      }
    })
   }
  }


  //
  // var key_code = event.keyCode ? event.keyCode : event.which;
  //        if((key_code  >=97 && key_code  <=122) || (key_code  >=48 && key_code <=57))
 //
 //  if(unknownLetters.i > -1 ) {
 //     console.log(unknownLetters)
 //    rightWord.push(keyword);
 //    underscore[keyword.indexOf(unknownLetters)] = keyword;
 //
 // }
 //
 // }
 //  if(underscore.join('') == randWord){
 //
 //    }






 // document.addEventListener('keypress', (event) => {
 //      keyword = String.fromCharCode(event.keyCode);
 //      if(randWord.indexOf(keyword) > -1) {
 //        correctWord.push(keyword);
 //
 //      }
 //
 // });
