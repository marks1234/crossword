import mapThePuzzle from "./Components/puzzleMapping.js";
import { findNumber, transpose } from "./Components/locatePosition.js";
import links from "./scrapHeap.js";
import inputValid from "./ErrorChecker/errorsAplently.js";
const puzzle = "20110\n0.00.\n1000.\n0..0.";
const words = ["caset", "elan", "ciao", "anta", "set"].reverse();
var puzzleMap;
var linkMap;
const output = [];
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
function wordPlaced(start, arr, leng) {
    if (leng == undefined) {
        return false;
    }
    for (let x = 0; x < leng; x++) {
        if (arr[start + x] == ".")
            return false;
    }
    return true;
}
function findNextLocation(position_info, isHorizontalPlaced, isVerticalPlaced) {
    let { x, y } = position_info;
    if (position_info.size == 2 && isHorizontalPlaced && !isVerticalPlaced) {
        return { x_out: x, y_out: y };
    }
    if (x + 1 < puzzleMap[y].length) {
        x++;
    }
    else if (x + 1 == puzzleMap[y].length) {
        x = 0;
        if (y + 1 == puzzleMap.length) {
            return { x_out: undefined, y_out: undefined };
        }
        else {
            y++;
        }
    }
    return { x_out: x, y_out: y };
}
const loopFiltered = (x, y, words, filtered_words, o_matrix, verticals) => {
    let position_info = findNumber(puzzleMap, x, y);
    for (const word of filtered_words) {
        placeWord(o_matrix, word, position_info.x, position_info.y, verticals);
        const updated_o_matrix = JSON.parse(JSON.stringify(o_matrix));
        const updated_words = words.filter((element) => element != word);
        let horizontal = wordPlaced(x, updated_o_matrix[y], position_info.right);
        let vertical = wordPlaced(y, transpose(updated_o_matrix)[x], position_info.down);
        let { x_out, y_out } = findNextLocation(position_info, horizontal, vertical);
        // console.log(x_out, y_out);
        // console.log(x_out !== undefined && y_out !== undefined);
        if (x_out !== undefined && y_out !== undefined)
            recursive(x_out, y_out, updated_o_matrix, updated_words);
        // words = words.filter((element) => element != filtered_words_h[0]);
    }
};
function recursive(x, y, o_matrix, words) {
    if (words.length == 0) {
        output.push(o_matrix);
        return o_matrix;
    }
    let position_info = findNumber(puzzleMap, x, y);
    if (position_info.size <= 0) {
        let { x_out, y_out } = findNextLocation(position_info, false, false);
        if (x_out !== undefined && y_out !== undefined)
            recursive(x_out, y_out, o_matrix, words);
    }
    let filtered_words_h = words.filter((word, index) => {
        var _a;
        if (word.length != (position_info === null || position_info === void 0 ? void 0 : position_info.right))
            return false;
        let can_place = false;
        for (let x = 0; x < word.length; x++) {
            const pos_x = position_info.x + x;
            const pos_y = position_info.y;
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
    const updated_o_matrix = JSON.parse(JSON.stringify(o_matrix));
    if (filtered_words_h.length > 0) {
        loopFiltered(x, y, words, filtered_words_h, updated_o_matrix, false);
    }
    else if (filtered_words_v.length > 0) {
        loopFiltered(x, y, words, filtered_words_v, updated_o_matrix, true);
    }
}
function crosswordSolver(puzzle, words) {
    puzzleMap = mapThePuzzle(puzzle);
    linkMap = links(puzzleMap);
    const o_matrix = duplicateMatrixSize(puzzleMap[0].length, puzzleMap.length);
    if (inputValid(puzzle, words)) {
        recursive(0, 0, o_matrix, words);
        if (output.length == 1) {
            console.log(words);
            output.forEach((matrix) => {
                console.log("---------------------------------------------------------");
                for (const a of matrix) {
                    console.log(JSON.stringify(a));
                }
                console.log("---------------------------------------------------------");
            });
        }
        else
            console.log("Error");
    }
    else {
        console.log("Error");
    }
}
crosswordSolver(puzzle, words);
