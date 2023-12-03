import mapThePuzzle from "./Components/puzzleMapping.js";
import findNumber from "./Components/locatePosition.js";
import links from "./scrapHeap.js";
const puzzle = "20110\n0.00.\n1000.\n0..0.";
const words = ["caset", "elan", "ciao", "anta", "set"];
var puzzleMap;
var linkMap;
function handleError(condition) {
    if (condition == undefined)
        throw new Error("Undefined error");
    throw new Error(`The following condition has not been met:\n${condition}`);
}
function duplicateMatrixSize(x, y) {
    let arr_out = [];
    for (let i = 0; i < y; i++) {
        arr_out.push([]);
        for (let j = 0; j < x; j++) {
            arr_out[i].push(".");
        }
    }
    return arr_out;
}
function placeWord(o_matrix, word, x, y, vertical) {
    for (let i = 0; i < word.length; i++) {
        if (!vertical) {
            o_matrix[y][x + i] = word[i];
        }
        else {
            o_matrix[y + i][x] = word[i];
        }
    }
    return o_matrix;
}
function recursive(x, y, o_matrix, words) {
    let position_info = findNumber(puzzleMap, x, y);
    // ALERT
    // some logic to continue if position_info.size == -1
    let filtered_words_h = words.filter((word, index) => {
        var _a;
        if (word.length != (position_info === null || position_info === void 0 ? void 0 : position_info.right))
            return false;
        let can_place = false;
        for (let x = 0; x < word.length; x++) {
            const pos_x = position_info.x + x;
            const pos_y = position_info.y;
            console.log("word[x] ", word[x]);
            console.log("o_matrix[pos_y][pos_x]", o_matrix[pos_y][pos_x]);
            if (o_matrix[pos_y][pos_x] == ".")
                can_place = true;
            if ((_a = linkMap.get(pos_x)) === null || _a === void 0 ? void 0 : _a.get(pos_y)) {
                if (o_matrix[pos_y][pos_x] != ".")
                    if (word[x] != o_matrix[pos_y][pos_x])
                        return false;
            }
        }
        return can_place;
    });
    let filtered_words_v = words.filter((word, index) => {
        var _a;
        if (word == "sun")
            console.log("sun");
        if (word.length == 3)
            console.log(word);
        if (word.length != (position_info === null || position_info === void 0 ? void 0 : position_info.down))
            return false;
        let can_place = false;
        for (let y = 0; y < word.length; y++) {
            const pos_x = position_info.x;
            const pos_y = position_info.y + y;
            if (o_matrix[pos_y][pos_x] == ".")
                can_place = true;
            if ((_a = linkMap.get(pos_x)) === null || _a === void 0 ? void 0 : _a.get(pos_y)) {
                if (o_matrix[pos_y][pos_x] != ".")
                    if (word[y] != o_matrix[pos_y][pos_x])
                        return false;
            }
        }
        return can_place;
    });
    console.log("h ", filtered_words_h);
    console.log("v ", filtered_words_v);
    if (filtered_words_h.length > 0) {
        let any = placeWord(o_matrix, filtered_words_h[0], position_info.x, position_info.y, false);
        words = words.filter((element) => element != filtered_words_h[0]);
        for (const a of any) {
            console.log(JSON.stringify(a));
        }
    }
    else if (filtered_words_v.length > 0) {
        let any = placeWord(o_matrix, filtered_words_v[0], position_info.x, position_info.y, true);
        words = words.filter((element) => element != filtered_words_v[0]);
        for (const a of any) {
            console.log(JSON.stringify(a));
        }
    }
    return words;
}
function crosswordSolver(puzzle, words) {
    puzzleMap = mapThePuzzle(puzzle);
    linkMap = links(puzzleMap);
    const o_matrix = duplicateMatrixSize(puzzleMap[0].length, puzzleMap.length);
    // console.log(puzzle);
    // console.log(words);
    // console.log(links(puzzleMap));
    // console.log(findNumber(puzzleMap, 0, 0));
    let t = recursive(0, 0, o_matrix, words);
    t = recursive(0, 0, o_matrix, t);
    t = recursive(2, 0, o_matrix, t);
    t = recursive(3, 0, o_matrix, t);
    t = recursive(0, 2, o_matrix, t);
    // t = recursive(12, 3, o_matrix, t);
    // t = recursive(6, 4, o_matrix, t);
    // t = recursive(0, 5, o_matrix, t);
    // t = recursive(7, 6, o_matrix, t);
    // t = recursive(10, 6, o_matrix, t);
    // console.log(list);
}
crosswordSolver(puzzle, words);
