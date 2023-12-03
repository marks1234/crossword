export default function inputValid(crsWd: any, wds: any) {
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

function dataTypesOk(crsWd: any, wds: any) {
	if (crsWd.length === 0 || wds.length === 0) {
		return false;
	}

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

function noDoublewords(wds: any) {
	let checked = [...new Set(wds)];
	if (checked.length === wds.length) {
		return true;
	}
	return false;
}

//checks if board has only legal symbols
function noIllegalSymbols(str: any) {
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
function notMalformedBoard(crsWd: any, wds: any) {
	let nums = [];
	const regX = /[1-2]/g;
	let count = 0;
	nums = crsWd.match(regX);
	//theoretically, this is not ideal, as the numbers are sorted as strings. 12 smaller that 2.
	//but each position can have max only 4(2?) words starting, so it is ok.
	if (nums === null) {
		return false;
	}

	nums.sort();
	for (let i = 0; i < nums.length; i++) {
		nums[i] = parseInt(nums[i]);
	}
	let words = 0;
	for (let i = 0; i < nums.length; i++) {
		words += nums[i];
	}

	if (words !== wds.length) {
		return false;
	}

	//remove 1-s as these are not applicable for following search
	for (let i = 0; i < nums.length; ) {
		if (nums[i] === 1) {
			nums.splice(i, 1);
		} else {
			i++;
		}
	}
	//also duplicate entries
	nums = [...new Set(nums)];

	//start from the end, the biggest number
	for (let i = nums.length; i > 0; i--) {
		if (checkOneStartAmount(nums[i], wds) == false) {
			return false;
		}
	}
	return true;
}

//if there are less words with same starting letter, than required at crossword start spot, the puzzle is unsolvable
function checkOneStartAmount(num: any, wds: any) {
	for (let a = 0; a < wds.length; a++) {
		let count = 1;
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
