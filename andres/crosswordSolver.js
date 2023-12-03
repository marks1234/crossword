const puzzle1 = "2001\n0..0\n1000\n0..0";
const words1 = ["casa", "alan", "ciao", "anta"];

const puzzle2 = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`;

const words2 = [
	"sun",
	"sunglasses",
	"suncream",
	"swimming",
	"bikini",
	"beach",
	"icecream",
	"tan",
	"deckchair",
	"sand",
	"seaside",
	"sandals",
];

const puzzle3 = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`;

const words3 = [
	"popcorn",
	"fruit",
	"flour",
	"chicken",
	"eggs",
	"vegetables",
	"pasta",
	"pork",
	"steak",
	"cheese",
];

const puzzle4 = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`;

const words4 = [
	"sun",
	"sunglasses",
	"suncream",
	"swimming",
	"bikini",
	"beach",
	"icecream",
	"tan",
	"deckchair",
	"sand",
	"seaside",
	"sandals",
].reverse();

//mismatch of amount of words
const puzzleErr1 = "2001\n0..0\n2000\n0..0";
const wordsErr1 = ["casa", "alan", "ciao", "anta"];

//more than 2 words starting... I wrote the check in, but...  ... SHOULD IT work like this ?

const puzzleErr2 = "0001\n0..0\n3000\n0..0";
const wordsErr2 = ["casa", "alan", "ciao", "anta"];

//duplicaiton of words
const puzzleErr3 = "2001\n0..0\n1000\n0..0";
const wordsErr3 = ["casa", "casa", "ciao", "anta"];

//wrong puzzle format
const puzzleErr4 = "";
const wordsErr4 = ["casa", "alan", "ciao", "anta"];

const puzzleErr5 = 123;
const wordsErr5 = ["casa", "alan", "ciao", "anta"];

const puzzleErr6 = "";
const wordsErr6 = 123;

//test for multiple solutions - THIS CURRET CHECK SET DOESNT CATCH THIS!
const puzzleErr7 = "2000\n0...\n0...\n0...";
const wordsErr7 = ["abba", "assa"];

function crosswordSolver(crsWd, wds) {
	if (inputValid(crsWd, wds)) {
	} else {
		return "Error";
	}
}

function inputValid(crsWd, wds) {
	//console.log(dataTypesOk(crsWd, wds));
	//console.log(noDoublewords(wds));
	//console.log(noIllegalSymbols(crsWd));
	//console.log(notMalformedBoard(crsWd, wds));

	if (dataTypesOk(crsWd, wds)) {
		if (
			noDoublewords(wds) &&
			noIllegalSymbols(crsWd) &&
			notMalformedBoard(crsWd, wds)
		) {
			return true;
		}
	}
	return false;
}

function dataTypesOk(crsWd, wds) {
	if (crsWd.length === 0 || wds.length === 0) {
		return false;
	}

	//console.log("type: ",typeof crsWd)
	if (typeof crsWd != "string") {
		return false;
	}

	// should words with length = 0 be valid ? probably not.
	for (let i = 0; i < wds.length; i++) {
		if (typeof wds[i] !== "string" || wds[i].length === 0) {
			return false;
		}
	}

	return true;
}

function noDoublewords(wds) {
	let checked = [...new Set(wds)];
	if (checked.length === wds.length) {
		return true;
	}
	return false;
}

//checks if board has only legal symbols
function noIllegalSymbols(str) {
	// console.log(typeof str);
	let regX = /[^\n.0-2]/g;
	let check = str.match(regX);
	if (check === null) {
		return true;
	}
	if (check.length === 0) {
		return true;
	}
	return false;
}

//checks if amount of start spots = amount of words
//also checks if the amount of words starting with letter i >= with start spots. If there is spot with 4 words starting,
//and only 3 words with same start char, its faulty
function notMalformedBoard(crsWd, wds) {
	let nums = [];
	const regX = /[1-9]/g;
	let count = 0;
	nums = crsWd.match(regX);
	//theoretically, this is not ideal, as the numbers are sorted as strings. 12 smaller that 2.
	//but each position can have max only 4(2?) words starting, so it is ok.
	if (nums === null) {
		return false;
	}

	nums.sort();
	for (let i = 0; i < nums.length; i++) {
		nums[i] = Number.parseInt(nums[i]);
	}
	let words = 0;
	for (let i = 0; i < nums.length; i++) {
		words += nums[i];
	}

	if (words !== wds.length) {
		return false;
	}

	for (let i = 0; i < nums.length; ) {
		if (nums[i] > 4) {
			return false;
		}

		return true;
	}

	//remove 1-s as these are not applicable for following search
	for (let i = 0; i < nums.length; ) {
		if (nums[i] === 1) {
			nums.splice(i, 0);
		} else {
			i++;
		}
	}
	//also duplicate entries
	nums = [...new Set(nums)];

	for (let i = 0; i < nums.length; i++) {
		if (nums[i] > 2) {
			return false;
		}
	}

	//start from the end, the biggest number
	for (let i = nums.length; i > 0; ) {
		if (checkOneStartAmount(nums[i], wds) == false) {
			return false;
		}
	}
	return true;
}

//if there are less words with same starting letter, than required at crossword start spot, the puzzle is unsolvable
function checkOneStartAmount(num, wds) {
	for (let a = 0; a < wds.length; a++) {
		count = 1;
		for (let u = 0; u < wds.length; u++) {
			if (a !== u && wds[a][0] === wds[u][0]) {
				count++;
			}
		}
		if (num > count) {
			return false;
		}
	}
	return true;
}

console.log("input1 ", inputValid(puzzle1, words1));
console.log("input2 ", inputValid(puzzle2, words2));
console.log("input3", inputValid(puzzle3, words3));
console.log("input4 ", inputValid(puzzle4, words4));

console.log("inputErr1 ", inputValid(puzzleErr1, wordsErr1));
console.log("inputErr2 ", inputValid(puzzleErr2, wordsErr2));
console.log("inputErr3", inputValid(puzzleErr3, wordsErr3));
console.log("inputErr4 ", inputValid(puzzleErr4, wordsErr4));
console.log("inputErr5 ", inputValid(puzzleErr5, wordsErr5));
console.log("inputErr6 ", inputValid(puzzleErr6, wordsErr6));
console.log("inputErr7 ", inputValid(puzzleErr7, wordsErr7));
