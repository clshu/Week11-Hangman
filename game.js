const Word = require('./word');
// Generate random integer between min(included) and max (excluded)
function getRandomInt(min, max) {
	var min = Math.ceil(min);
	var max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = function Game(gameData) {
	this.word = null;
	this.initialize = function () {
		var index = getRandomInt(0, gameData.length);
		this.word = new Word(gameData[index]);
		// Remove selected one, so it won't be selected again
		// if it needs multiple game
		gameData.splice(index, 1);
	};
	this.initialize();
}
