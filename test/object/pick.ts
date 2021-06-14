import test from 'ava';
import {pick} from '../../src/index.js';

test('array predicate', t => {
	const pickKeys = Object.keys(pick({foo: true, bar: false}, ['foo']));
	t.is(pickKeys[0], 'foo');
	t.is(pickKeys.length, 1);
});

test('__proto__ keys', t => {
	const input = {['__proto__']: {foo: true}};
	t.deepEqual(pick(input, ['__proto__']), input);
});

test('should omit undefineds', t => {
	const empty = {} as any;
	t.deepEqual(pick(empty, ['foo', 'bar', 'baz']), empty);
});
