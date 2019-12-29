/*------------------------ 107  ----------------------------*/
export function alg1(m: number): number {
	let k: number = 0; // minimal value of "k"
	let num: number = 1;

	if(m <= 1) {
		return 0;
	}

	while(num * 4 < m) {
		num *= 4;
		k++;
	}
	return k;
}

/*------------------------ 107  ----------------------------*/


/*------------------------ 243  ----------------------------*/
const sq = n => n * n;
const checkIfNumAndNotEmpty = n => {
	if(!n || isNaN(n)) {
		console.warn('[Not a number]');
		return;
	}
};

interface INums {
	x: number;
	y: number;
};
// a)
export function alg2a(num: number): INums {
	let isPairExist: boolean = false;
	const nums = {};
	checkIfNumAndNotEmpty(num);
	for(let x: number = 1; x < num; x++) {
		for(let y: number = x; y < num; y++) {
			if(sq(x) + sq(y) === num) {
				isPairExist = true;
				nums['x'] = x;
				nums['y'] = y;
				break;
			}
		}
	}
	if(!isPairExist) {
		console.warn('[There are no number.]')
	}
	return nums as INums;
}

// b)
export function alg2b(num: number): Array<INums> {
	let isPairExist: boolean = false;
	const nums: Array<INums> = [];
	checkIfNumAndNotEmpty(num);
	const squareNum: number = Math.floor(Math.sqrt(num)); 
	for(let x: number = squareNum; x >= 1; x--) {
		for(let y: number = 1; y < squareNum; y++) {
			if(sq(x) + sq(y) === num) {
				if(x >= y) {
					isPairExist = true;
					nums.push({
						x,
						y
					});
				}
			}
		}
	}
	if(!isPairExist) {
		console.warn('[There are no number.]');
	}
	return nums;
}

/*------------------------ 243  ----------------------------*/
