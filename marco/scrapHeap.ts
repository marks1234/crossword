export default function links(puzzleMap: string[][]) {
	const mapOut: Map<number, Map<number, boolean>> = new Map();
	for (let y = 0; y < puzzleMap.length; y++) {
		for (let x = 0; x < puzzleMap[y].length; x++) {
			const check_dot = (x: number, y: number) => puzzleMap[y][x] != ".";

			const check_left = () => (x != 0 ? check_dot(x - 1, y) : false);
			const check_right = () =>
				x != puzzleMap[y].length - 1 ? check_dot(x + 1, y) : false;
			const check_up = () => (y != 0 ? check_dot(x, y - 1) : false);
			const check_down = () =>
				y != puzzleMap.length - 1 ? check_dot(x, y + 1) : false;

			if (mapOut.get(x) == undefined) {
				mapOut.set(x, new Map());
			}

			if (check_dot(x, y)) {
				const store = (bool: boolean) => mapOut.get(x)?.set(y, bool);
				const amount = parseInt(puzzleMap[y][x]);

				if (amount == 2) store(true);
				if ((check_left() || check_right()) && (check_up() || check_down())) {
					store(true);
				} else {
					store(false);
				}
			}
		}
	}
	return mapOut;
}
