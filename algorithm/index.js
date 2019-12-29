"use strict";
exports.__esModule = true;
/*------------------------ 107  ----------------------------*/
function alg1(m) {
	var k = 0; // minimal value of "k"
	var num = 1;
	if (m <= 1) {
		return 0;
	}
	while (num * 4 < m) {
		num *= 4;
		k++;
	}
	return k;
}
exports.alg1 = alg1;
/*------------------------ 107  ----------------------------*/
/*------------------------ 243  ----------------------------*/
var sq = function (n) { return n * n; };
var checkIfNumAndNotEmpty = function (n) {
	if (!n || isNaN(n)) {
		console.warn('[Not a number]');
		return;
	}
};
;
// a)
function alg2a(num) {
	var isPairExist = false;
	var nums = {};
	checkIfNumAndNotEmpty(num);
	for (var x = 1; x < num; x++) {
		for (var y = x; y < num; y++) {
			if (sq(x) + sq(y) === num) {
				isPairExist = true;
				nums['x'] = x;
				nums['y'] = y;
				break;
			}
		}
	}
	if (!isPairExist) {
		console.warn('[There are no number.]');
	}
	return nums;
}
exports.alg2a = alg2a;
// b)
function alg2b(num) {
	var isPairExist = false;
	var nums = [];
	checkIfNumAndNotEmpty(num);
	var squareNum = Math.floor(Math.sqrt(num));
	for (var x = squareNum; x >= 1; x--) {
		for (var y = 1; y < squareNum; y++) {
			if (sq(x) + sq(y) === num) {
				if (x >= y) {
					isPairExist = true;
					nums.push({
						x: x,
						y: y
					});
				}
			}
		}
	}
	if (!isPairExist) {
		console.warn('[There are no number.]');
	}
	return nums;
}
exports.alg2b = alg2b;
/*------------------------ 243  ----------------------------*/
