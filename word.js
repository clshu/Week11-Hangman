const Letter = require('./letter');

module.exports = function Word(str) {
	this.answer = str.toLowerCase().split('');
	this.guesses = [];
	this.letters = new Letter(this.answer.length);

	this.addGuess = function (ch) {
		this.guesses.push(ch);
	};
	this.setLetter = function (index, ch) {
		this.letters.set(index, ch);
	};
	// find all occurences of ch in answer, if found,
	// replace marker with ch in letters accordingly
	this.find = function (ch) {
		var isFound = false;
		for (var i = 0; i < this.answer.length; i++) {
			if (ch === this.answer[i]) {
				this.letters.set(i, ch);
				isFound = true;
			}
		}
		return isFound;
	};
	this.isGuessed = function (ch) {
		return (this.guesses.indexOf(ch) != -1);
	};
	this.isMatched = function () {
		return this.letters.isMatched();
	};
	this.displayResult = function () {
		console.log('Result: ' + this.letters.display());
	};
	this.displayGuesses = function () {
		console.log('Letters Guessed: ' + this.guesses.join(', '));
	};
}