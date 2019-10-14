// GLOBAL VARIABLES
//=================================================================
var words;
var randNum;
var randWord;
var triesLeft = 6;
var unknownLetters;
var underScores = [];
var playerGuesses = [];
var changeUnderScores;
var wrongLetter = [];
var correctLetter = [];


// MAIN
// ==================================================================




 // GET the list of words from api
  function getArrOfWords(){
   fetch('http://app.linkedin-reach.io/words')
  .then(res => (res.text())) // get the response back in text
  .then(data => words = data.split(/\r|\n/)) // turn the response into an array of words
  .then(words => this.startGame())
}

getArrOfWords();

  // generate a random word from the array of words
  function startGame() {
      randNum = Math.floor(Math.random() * words.length);
      randWord = words[randNum];
      // currentWord.push(randWord)
      unknownLetters = Array.from(randWord);
      console.log(unknownLetters)
      for(var i = 0; i < unknownLetters.length; i++)
      {
        underScores.push('_')
      }
      document.getElementById('word-blanks').innerHTML = underScores.join(" ")
      console.log(underScores);
      // reset
      wrongLetters = [];
      triesLeft = 6;

      //HTML
      document.getElementById('guesses-left').innerHTML = triesLeft;

   }
   //
   // function trackWinsLosses()
   // {
   //
   // }

  // listen for keyup (letters that are pressed and released)
  // decrease triesLeft counter if playerGuesses are wrong
  // change underScores and reveal ocurrences of correct playerGuesses, if player guesses correctly
   document.onkeyup = function(event){
     playerGuesses = event.key;
     console.log(playerGuesses)

     if(unknownLetters.indexOf(playerGuesses) > - 1) {
     for(var i = 0; i < unknownLetters.length; i++)

     {

       if (unknownLetters[i] === playerGuesses)
        {

        underScores[i] = playerGuesses;
        correctLetter.push(playerGuesses);
        var changeUnderScores = document.getElementById("word-blanks");
        changeUnderScores.innerHTML = underScores.join(' ');
        document.getElementById('message').innerHTML = "CORRECT!"
        document.getElementById("rightGuess").innerHTML = correctLetter.join(' ')
   //     correct++;
   //     trackWinsLosses();
         }
   //
     }
   //
   }
      else
      {
      wrongLetter.push(playerGuesses);
      triesLeft--;
      document.getElementById("wrongGuess").innerHTML = wrongLetter.join(' ')
      document.getElementById('guesses-left').innerHTML = triesLeft;
      document.getElementById('message').innerHTML = "Wrong guess, try again!"
   //    trackWinsLosses();
      }

   }
