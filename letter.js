const marker = '_';

module.exports = function Letter(length) {
	this.letters = [];
	this.initialize = function () {
		for (var i = 0; i < length; i++) {
			this.letters.push(marker);
		}
	};
	this.set = function (index, ch) {
		this.letters[index] = ch;
	};
	// If all ch are replaced and no marker ('_') is found
	// The word is matched with answer
	this.isMatched = function () {
		return (this.letters.indexOf(marker) == -1);
	};
	this.display = function () {
		return this.letters.join(' ');
	};
	
	this.initialize();	
}