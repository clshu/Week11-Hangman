const Word = require('./word');
const maxGuessCount = 20;
// Generate random integer between min(included) and max (excluded)
function getRandomInt(min, max) {
	var min = Math.ceil(min);
	var max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = function Game(gameData) {
	this.word = null;
	this.over = false;
	this.count = maxGuessCount;
	this.initialize = function () {
		/*
		if (gameData.length == 0) {
			this.over = true;
			return;
		}
		*/
		var index = getRandomInt(0, gameData.length);
		this.word = new Word(gameData[index]);
		// Remove selected one, so it won't be selected again
		gameData.splice(index, 1);
	};
	this.initialize();
}

module.exports.getMaxCount = function () {
	return maxGuessCount;
}