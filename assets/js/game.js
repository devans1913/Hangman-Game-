
var gameObject = {
	currentLetter: "",

	allGuesses: [],
	incorrectGuesses: [],
	correctGuesses: [],
	correctGuessesInOrder: [],

	bandsArray: ["LED ZEPPELIN", "THE POLICE", "A TRIBE CALLED QUEST", "JOURNEY", "DURAN DURAN", "POISON", "RUN DMC", "NIRVANA", "BEASTIE BOYS"],
	randomWord: "",
	bandLetters:[],

	isMatch: null,
	isRepeat: null,

	guessesRemaining: 10,
	loseCount: 0,
	winCount:0,

	generateWord: function(){

		//Generate random number from 0-8
		var random_num = Math.random() * 9;
		random_num = Math.floor(random_num);

		//Assign randomWord array
		
		this.randomWord = this.bandsArray[random_num];
		this.bandLetters = this.randomWord.split("");
		console.log(this.randomWord + " " + this.bandLetters);

		//Since the game works on wins/loss, reset the guesses

		this.allGuesses = [];
		this.incorrectGuesses = [];
		this.correctGuesses = [];
		this.correctGuessesInOrder = [];
		this.guessesRemaining = 10;
	},

	checkRepeat:function(){
		var repeatCounter = -1;

		//Loop the number of guesses made 

		for (var i=0; i < this.allGuesses.length; i++){
			if (this.currentLetter == this.allGuesses[i]){
				repeatCounter++;
			}
		}
		
		if (repeatCounter == 0){
			this.isRepeat = false;
		}
		else{
			this.isRepeat = true;
		}
	},

	checkMatch: function(){
		var matchCounter = 0;

		//Loop for the band names length amount of times

		for (var i=0; i < this.bandLetters.length; i++){
			if (this.currentLetter == this.bandLetters[i]){
				matchCounter++;
			}
		}
		
		if (matchCounter == 0){
			this.isMatch = false;
		}
		else{
			this.isMatch = true;
		}
	},

	match_repeatComparison: function(){
		//If the same key is pressed twice, it is removed from allGuesses.
		if (this.isRepeat == true){
			this.allGuesses.pop(this.currentLetter);
		}
		//Letter has not been guessed and was a wrong guess, put the currentLetter in incorrectGuesses.
		if (this.isRepeat == false && this.isMatch == false){
			this.incorrectGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
		//Letter has not been guessed and was a correct guess, put the currentLetter in correctGuesses.
		if (this.isRepeat == false && this.isMatch == true){
			this.correctGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
	},
	revealBand: function(){
		//If there are no correctGuesses,
		//For the number of letters in the bands name, fill the displayed guesses with an underscore.
		if (this.correctGuesses.length == 0){
			for (var i =0; i<this.bandLetters.length; i++){
				this.correctGuessesInOrder[i] = "_";
			}
		}
		else {
			for (var i=0; i<this.bandLetters.length; i++){
				if (this.correctGuessesInOrder[i] != this.bandLetters[i]){
					for (var j=0; j<this.correctGuesses.length; j++){
						
						if (this.correctGuesses[j] == this.bandLetters[i]){
							this.correctGuessesInOrder[i] = this.bandLetters[i];
						}
						
						else {
							this.correctGuessesInOrder[i] = "_";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.correctGuessesInOrder.join(" ");
		document.getElementById("num-wins").innerHTML = ("Wins: " + this.winCount + "  " + "Losses: " + this.loseCount);
		document.getElementById("letters-guessed").innerHTML = this.incorrectGuesses;
		document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
	},

	checkProgress: function(){
		var counter = 0;

		//If a guess is equal to the the band letter at the same index, add 1 to the counter.
		for (var i=0; i<this.bandLetters.length; i++){
			if (this.correctGuessesInOrder[i] == this.bandLetters[i]){
				counter++;
			}
		}

		//If the counter is the length of the band name, user wins
		if (counter == this.bandLetters.length){
			alert("Totally Dude, You Win!");
			this.winCount++;
			this.generateWord();
		}
		//If the number of guesses remaining is zero, user loses.
		if (this.guessesRemaining == 0){
			alert("Not Even, Try Again!");
			this.loseCount++;
			this.generateWord();
		}
	}
}

var userStartedGameOnce = false;

//One keyup...
document.onkeyup = function(q) {
gameObject.currentLetter = String.fromCharCode(q.keyCode).toUpperCase();

	//If the user presses the space button upon loading the page, start the game.
	if (gameObject.currentLetter == " " && userStartedGameOnce == false){

		gameObject.generateWord();
		userStartedGameOnce = true;

	}

	gameObject.allGuesses.push(gameObject.currentLetter);

	console.log("Current Letter: " + gameObject.currentLetter + "\n" + "Band Letters: " + gameObject.bandLetters + "\n" + "All Guesses: " + gameObject.allGuesses);


	//Check repeat letters and matched to bandNames

	gameObject.checkRepeat();
	gameObject.checkMatch();

	gameObject.match_repeatComparison();

	console.log("Correct Guesses: " + gameObject.correctGuesses);
	console.log("Incorrect Guesses: " + gameObject.incorrectGuesses);
	console.log("Guesses Remaining:" + gameObject.guessesRemaining);

	//Reveals the band name as it is being guessed.
	gameObject.revealBand();
	console.log(gameObject.correctGuessesInOrder);

	//Check to see if the game is still in progress or if a win/lose has happened
	gameObject.checkProgress();


}

