interface NumberNode {
	x: number;
	y: number;
	size: number;
	right?: number;
	down?: number;
}

function findLen(arr: string[], num: number) {
	if (parseInt(arr[num]) > 0) {
		let newArray = arr.slice(num);
		let index = newArray.indexOf(".");
		newArray = newArray.slice(0, index);
		return newArray.length;
	}
	return 0;
}

function transpose(matrix: any) {
	return matrix[0].map((_: any, colIndex: any) =>
		matrix.map((row: any) => row[colIndex])
	);
}

function findNumbers(arr: string[][]) {
	let list_out: NumberNode[] = [];
	for (let y = 0; y < arr.length; y++) {
		for (let x = 0; x < arr[y].length; x++) {
			if (arr[y][x] != ".") {
				const size = parseInt(arr[y][x]);
				list_out.push(<NumberNode>{
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

export default function findNumber(arr: string[][], x: number, y: number) {
	if (arr[y][x] != ".") {
		const size = parseInt(arr[y][x]);
		return <NumberNode>{
			x: x,
			y: y,
			size: size,
			right: findLen(arr[y], x),
			down: findLen(transpose(arr)[x], y),
		};
	}
	return <NumberNode>{
		x: x,
		y: y,
		size: -1,
	};
}
