import { alg1 } from '../index';
import { expect, assert } from 'chai';
const { equal, typeOf } = assert;
describe('Alg1', () => {
	
	it('Should equal 0 for parameter 2', () => {
		const result = alg1(2);
		const expected = 0;
		equal(result, expected);
	});

	it('Should equal 0 for parameter 4', () => {
		const result = alg1(4);
		const expected = 0;
		equal(result, expected);
	});

	it('Should equal 2 for parameter 20', () => {
		const result = alg1(20);
		const expected = 2;
		equal(result, expected);
	});

	it('Should return 0 for parameter <= 1', () => {
		const result = alg1(0);
		const expected = 0;
		equal(result, expected);
	});

	it('Should return a number', () => {
		const result = alg1(20);
		const expected = 'number';
		typeOf(result, expected);
	});

});

