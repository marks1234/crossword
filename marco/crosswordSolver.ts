import mapThePuzzle from "../crossword/Components/puzzleMapping.js";
import findNumber from "./Components/locatePosition.js";
import links from "./scrapHeap.js";

// const puzzle = "2001\n0..0\n1000\n0..0";
// const words = ["casa", "alan", "ciao", "anta"];
var puzzleMap: string[][] = [];
var linkMap: Map<number, Map<number, boolean>>;

const puzzle = `...1...........
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
const words = [
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

interface NumberNode {
	x: number;
	y: number;
	size: number;
	right?: number;
	down?: number;
}

function handleError(condition: string) {
	if (condition == undefined) throw new Error("Undefined error");
	throw new Error(`The following condition has not been met:\n${condition}`);
}

function duplicateMatrixSize(x: number, y: number) {
	let arr_out: string[][] = [];
	for (let i = 0; i < y; i++) {
		arr_out.push([]);
		for (let j = 0; j < x; j++) {
			arr_out[i].push(".");
		}
	}
	return arr_out;
}

function recursive(
	x: number,
	y: number,
	o_matrix: string[][],
	words: string[]
) {
	let position_info = findNumber(puzzleMap, x, y);
	// ALERT
	// some logic to continue if position_info.size == -1
	let filtered_words_h = words.filter((word, index) => {
		if (word.length != position_info?.right) return false;
		for (let x = 0; x < word.length; x++) {
			const pos_x = position_info.x + x;
			const pos_y = position_info.y;

			if (linkMap.get(pos_x)?.get(pos_y))
				if (o_matrix[pos_y][pos_x] != ".")
					if (word[x] != o_matrix[pos_y][pos_x]) return false;
		}
		return true;
	});
	let filtered_words_v = words.filter((word, index) => {
		let bool = true;

		if (word.length != position_info?.down) bool = false;
		for (let y = 0; y < word.length; y++) {
			const pos_x = position_info.x;
			const pos_y = position_info.y + y;

			if (linkMap.get(pos_x)?.get(pos_y))
				if (o_matrix[pos_y][pos_x] != ".")
					if (word[x] != o_matrix[pos_y][pos_x]) return false;
		}

		return bool;
	});
	console.log("h ", filtered_words_h);
	console.log("v ", filtered_words_v);
	for (let i = 0; i < words.length; i++) {}
}

function crosswordSolver(puzzle: string, words: Array<string>) {
	puzzleMap = mapThePuzzle(puzzle);
	linkMap = links(puzzleMap);
	const o_matrix = duplicateMatrixSize(puzzleMap[0].length, puzzleMap.length);

	console.log(puzzle);
	// console.log(links(puzzleMap));
	// console.log(findNumber(puzzleMap, 0, 0));
	recursive(1, 8, o_matrix, words);

	// console.log(list);
}

crosswordSolver(puzzle, words);
