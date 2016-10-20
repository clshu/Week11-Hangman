const readline = require('readline');

const Game = require('./game');

// Global variables
var gameData = [];
var winCount = 0;
var lossCount = 0;
var gamesLeft = 0;
var extraMsg = '';
var isNewGame = true;

const answers = [
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
// Functions
function loadData () {
	// Clone answers
	answers.forEach(function (item) {
		gameData.push(item);
	});
}

function displayAll(game) {
	//var gamesLeft = gameData.length + 1; // extra 1 is the one game selected and running
	console.log('-----------------------------');
	console.log(extraMsg);
	console.log('');
	game.word.displayResult();
	game.word.displayGuesses();
	console.log('Guesses Left:  ' + game.count);
	console.log('Wins: ' + winCount + '  Losses: ' + lossCount + '  Games Left: ' + gameData.length);
}

function postProcessing(game, result) {
	if (result == "win") {
		winCount++;
		extraMsg = 'You Won! Hit any key to start a new game.';
	} else if (result == "loss") {
		lossCount++;
		extraMsg = 'You Lost! Answer: ' + game.word.answer.join('');
		extraMsg += '\nHit any key to start a new game.';
	} else {
		extraMsg = "Argumnet error: " + result;
	}

	isNewGame = true;

	if (gameData.length == 0) {
		displayAll(game);
		console.log('\nGame Over!!!');
		process.exit();
	}
	
}
// Main Program

loadData();
gamesLeft = gameData.length;

var game = null;

console.log('Press a key to guess the right answer...');
console.log('Ctr-c to exit the program or it starts a new game after ' + Game.getMaxCount() + ' tries.');
console.log('Any key other than a-z or A-Z will be ignored.')
console.log('Hit any key to start!');

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
  process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {

	if (key.ctrl && key.name === 'c') {
   			process.exit();
  	}

	if (isNewGame) {
		isNewGame = false;
		game = new Game(gameData);
		extraMsg = 'New Game Starts .........';
	} else {
		extraMsg = 'Continuing ..............';
		game.count--;
  		if (!key.ctrl && !key.meta && key.name && key.name.length == 1 &&
  			key.name >= 'a' && key.name <= 'z') {
  			// !key.ctrl && !key.meta -> Skip Ctrl + * and Meta + * keystrokes
  			// key.name == true -> Skip special characters such as '!', '@', etc.
  			// key.name.length == 1 -> Skip 'tab', 'return', 'up', 'down', etc.
  			// The upper case letters has key.name in lower case and key.shift == true
    		if (game.word.isGuessed(key.name)) {
    			extraMsg = key.name + ' is guessed.';
    		} else {
    			game.word.addGuess(key.name);
    			// Test if key.name is found in the answer
    			var isFound = game.word.find(key.name);
    			// if letter is found in the answer,
				// and all letters match answer
    			if (isFound && game.word.isMatched()) {
    				postProcessing(game, "win");
    			} 
    		}
  		}
  		if (game.count == 0 && !(isFound && game.word.isMatched())) {
  			postProcessing(game, "loss");
  		}
  	}

  	displayAll(game);
});







