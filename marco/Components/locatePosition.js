function findLen(arr, num) {
    if (parseInt(arr[num]) > 0) {
        let newArray = arr.slice(num);
        let index = newArray.indexOf(".");
        if (index != -1)
            newArray = newArray.slice(0, index);
        if (newArray.length == 1)
            return 0;
        return newArray.length;
    }
    return 0;
}
function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}
function findNumbers(arr) {
    let list_out = [];
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            if (arr[y][x] != ".") {
                const size = parseInt(arr[y][x]);
                list_out.push({
                    x: x,
                    y: y,
                    size: size,
                    right: findLen(arr[y], x),
                    down: findLen(transpose(arr)[x], y),
                });
            }
        }
    }
    return list_out;
}
export default function findNumber(arr, x, y) {
    if (arr[y][x] != ".") {
        const size = parseInt(arr[y][x]);
        return {
            x: x,
            y: y,
            size: size,
            right: findLen(arr[y], x),
            down: findLen(transpose(arr)[x], y),
        };
    }
    return {
        x: x,
        y: y,
        size: -1,
    };
}
