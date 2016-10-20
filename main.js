const readline = require('readline');

const Game = require('./game');
const maxGuessCount = 20;
var guessCount = maxGuessCount;

var gameData = [];
var wins = 0;
var losses = 0;
var gameLeft = 0;
var extraMsg = '';

var answers = [
	"Aqaba",
	"Galapagos",
	"Mondoshawans",
	"Marseille",
	"Nautilus",
	"Edelweiss",
	"Apocalypse",
	"Buffalo",
	"Unknown",
	"Casablanca"
];

function loadData () {
	answers.forEach(function (item) {
		gameData.push(item);
	});
}


// Main Program

loadData();

var game = new Game(gameData);

//console.log(game.word.answer);
//console.log(game.word.guesses);
//console.log(game.word.letters);

function displayAll(game) {
	console.log('-----------------------------');
	console.log(extraMsg);
	game.word.displayResult();
	game.word.displayGuesses();
	console.log('Guesses Left:  ' + guessCount);
}

readline.emitKeypressEvents(process.stdin);
//process.stdin.setRawMode(true);
if (process.stdin.isTTY)
  process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
	
	guessCount--;
	if (guessCount <= 0) {
		console.log('Game Over. You Lost. Answer: ' + game.word.answer.join(''));
		process.exit();
	}
	
  	
  	if (key.ctrl && key.name === 'c') {
   		process.exit();
  	} else if (key.name && key.name.length == 1 &&
  		key.name >= 'a' && key.name <= 'z') {
   		//console.log(`You pressed the "${str}" key`);
    	//console.log();
    	//console.log(key);
    	//console.log();
    	debugger;
    	//console.log('key.name: ' + key.name);
    	if (game.word.isGuessed(key.name)) {
    		console.log(key.name + ' is guessed.');
    	} else {
    		game.word.addGuess(key.name);
    		// Test if key.name is found in the answer
    		var isFound = game.word.find(key.name);
    		// If key.name is found in the answer
    		// and all letters matched answer.
    		if (isFound && game.word.isMatched()) {
    			extraMsg = 'You Win.'
    			displayAll(game);
    			process.exit();
    		} 
    	}

  	}

  	displayAll(game);
});

console.log('Press a key to guess the right answer...');
console.log('Ctr-c to exit the progame or it exists after ' + maxGuessCount + ' tries.');
console.log('Any key other than a-z or A-Z will be ignored.')
displayAll(game);





