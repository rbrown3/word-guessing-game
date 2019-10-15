//  Global Variables
// ===============================================================================================
var words;
var randNum;
var randWord;
var wordBlanks;
var attempts = 6;
var wins = 0;
var underScore;
var playerGuesses = [];
var correctLetters = [];
var wrongletters = [];


// MAIN
//=================================================================================================

// GET the list of words from api
  function getArrOfWords(){
   fetch('http://app.linkedin-reach.io/words')
  .then(res => (res.text())) // get the response back in text
  .then(data => words = data.split(/\r|\n/)) // turn the response into an array of words
  .then(words => this.startGame()) // call on this function to begin the game
  }

  getArrOfWords() // call the function that GETs the list of words, turns the list into an array, starts the game

  function noDuplicateValues(value, index, self) {
    return self.indexOf(value) === index;
}


// pick a random word from array of words, create word blanks that equal the length of the word


  function startGame()

  {
    var clear = document.getElementById("guesses");
    clear.value = "";
    correctLetters = [];
    wrongletters = [];
    attempts = 6;
    underScore = [] //empty array to store underscores based on the length of the random word.
    randNum  = [Math.floor(Math.random() * words.length)]; // nearest integer from a random number (0.0 -1 ) times the length of words array
    randWord = words[randNum] // get a random word by using rand number as an index to retrieve a word at that location in array
    console.log(randWord);
    for( i = 0; i < randWord.length; i++ )
    {
       underScore[i] = "_";
    }
    document.getElementById('word-blanks').innerHTML = underScore.join(' ')
    document.getElementById('rightGuess').innerHTML = correctLetters
    document.getElementById('wrongGuess').innerHTML = wrongletters
    //reset the values to their original values


    document.getElementById('guesses-left').innerHTML = attempts
  }

  function winsAndLosses()

   {
     var correctWord = underScore.join('')
     setTimeout(4000)
     if (attempts < 0)
     {
       swal('Sorry, game over!')
       startGame();
     }
     else if (randWord === correctWord )
     {
       swal('You Won!');
       wins++;
       console.log(wins)
       startGame();

     }

   }

   var alreadyPressed = [];

  function guessEntry(){
    if(event.keyCode >= 65 && event.keyCode <= 90) {
          playerGuesses = event.key.toLowerCase();
        }
    if(randWord.indexOf(playerGuesses) > -1)
     {
    for(i = 0; i < randWord.length; i++)
      {
    if(randWord[i] === playerGuesses)
        {
          underScore[i] = playerGuesses
          var wordBlanks = document.getElementById("word-blanks")
          wordBlanks.innerHTML = underScore.join(' ')
          correctLetters.push(playerGuesses)

          // document.getElementById('word-blanks').innerHTML = underScore.join('')
          var uniqueCorrectLetters = correctLetters.filter(noDuplicateValues);
          document.getElementById('rightGuess').innerHTML = uniqueCorrectLetters;

        }
      }
     }
    else
      {
       wrongletters.push(playerGuesses);
       attempts--;
       var uniqueWrongLetters = wrongletters.filter(noDuplicateValues);
       document.getElementById('wrongGuess').innerHTML = uniqueWrongLetters
       document.getElementById('guesses-left').innerHTML = attempts

      }
      winsAndLosses()
  }
