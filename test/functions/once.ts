import test from 'ava';
import {once} from '../../src/index.js';

// Copy tests from onetime
// ref: https://github.com/sindresorhus/onetime/blob/e5fd86f2303546a2d9cc82f2a72c3ea840f6a2dc/test.js
test('call function once', t => {
	let i = 0;
	const fixture = once(() => ++i);
	t.is(fixture(), 1);
	t.is(fixture(), 1);
	t.is(fixture(), 1);
});

test('option to throw is called more than once', t => {
	const fixture = once(() => {}, true);
	fixture();
	t.throws(fixture, {message: /Function .* can only be called once/});
});

test('`callCount` method', t => {
	const fixture = once(() => {});
	t.is(once.callCount(fixture), 0);
	fixture();
	fixture();
	fixture();
	t.is(once.callCount(fixture), 3);
});

test('`callCount` method - throw on non-onetime-wrapped functions', t => {
	const fixture = () => {};

	t.throws(() => {
		once.callCount(fixture);
	}, {message: /not wrapped/});
});
