class Crossword {
	puzzleMap: any;
}

export default function mapThePuzzle(emptyPuz: string) {
	const horizontal = emptyPuz.split("\n").map((line) => line.split(""));
	return horizontal;
}
