class Crossword {
}
export default function mapThePuzzle(emptyPuz) {
    const horizontal = emptyPuz.split("\n").map((line) => line.split(""));
    return horizontal;
}
