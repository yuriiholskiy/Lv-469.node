import { alg2a } from '../index';
import { expect, assert } from 'chai';
const { include, deepEqual, typeOf, propertyVal } = assert;

describe('Alg2a', () => {
	it('Should return object with x prop equal 2 and y prop equal 4 for parameter 10', () => {
		const result = alg2a(10);
		const expected = {
			x: 1,
			y: 3
		};
		deepEqual(result, expected);
	});

	it('Should include object x: 1 property for parameter 10', () => {
		const result = alg2a(10);
		const expected = {
			x: 1
		};
		include(result, expected);
	});

	it('Should have x: 1 property for parameter 10', () => {
		const result = alg2a(10);
		const property = 'x';
		const expected = {
			x: 1
		};
		propertyVal(result, property, expected.x);
	});

	it('Should return object with x prop equal 18 and y prop equal 26 for parameter 1000', () => {
		const result = alg2a(1000);
		const expected = {
			x: 18,
			y: 26
		};
		deepEqual(result, expected);
	});

	it('Should include object with y: 26 property for parameter 1000', () => {
		const result = alg2a(1000);
		const expected = {
			y: 26
		};
		include(result, expected);
	});

	it('Should have y: 26 property for parameter 1000', () => {
		const result = alg2a(1000);
		const property = 'y';
		const expected = {
			y: 26
		};
		propertyVal(result, property, expected.y);
	});

	it('Should return an object', () => {
		const result = alg2a(10);
		const expected = {
			x: 1,
			y: 3
		};
		typeOf(result, typeof expected);
	});
});