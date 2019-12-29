import { alg2b } from '../index';
import { expect, assert } from 'chai';
const { deepInclude, deepEqual, isArray, propertyVal, lengthOf } = assert;

describe('Alg2b', () => {

	it('Should be array', () => {
		const result = alg2b(10);
		isArray(result);
	});

	it('Should return array with object value with x and y property', () => {
		const result = alg2b(10);
		const expected = [{
			x: 3,
			y: 1
		}];
		deepEqual(result, expected);
	});

	it('Should have length 1 for parameter 10', () => {
		const result = alg2b(10);
		const expected = 1;
		lengthOf(result, expected);
	});

	it('Should include object with x: 3 and y: 1 property for parameter 10', () => {
		const result = alg2b(10);
		const expected = {
			x: 3,
			y: 1
		};
		deepInclude(result, expected);
	});

	it('Should include object with x: 26 and y: 18 property for paramter 1000', () => {
		const result = alg2b(1000);
		const expected = {
			x: 26,
			y: 18
		};
		deepInclude(result, expected);
	});

	it('Should include object with x: 30 and y: 10  property for parameter 1000', () => {
		const result = alg2b(1000);
		const expected = {
			x: 30,
			y: 10
		};
		deepInclude(result, expected);
	});

	it('Should have length 2 for parameter 1000', () => {
		const result = alg2b(1000);
		const expected = 2;
		lengthOf(result, expected);
	});

});