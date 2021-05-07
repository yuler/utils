import test from 'ava';
import {throttle, sleep} from '../../src/index.js';

test('throttles a function', async t => {
	const wait = 100;
	const total = 500;
	let count = 0;

	const throttled = throttle(() => {
		count++;
	}, wait);

	const interval = setInterval(throttled, 20);

	await sleep(total + 5);

	clearInterval(interval);

	t.is(count, total / wait);
});

test('call function last time', async t => {
	const wait = 100;
	let count = 0;

	const throttled = throttle(() => {
		count++;
	}, wait);

	throttled();
	throttled();

	t.is(count, 1);
	await sleep(wait + 5);
	t.is(count, 2);
});

/* eslint-disable unicorn/no-this-assignment, no-useless-call */
test('call with context', async t => {
	const wait = 100;

	let ctx;
	const foo = {};
	const bar = {};

	const logctx = function (this: any) {
		ctx = this;
	};

	const throttled = throttle(logctx, wait);

	throttled.call(foo);
	throttled.call(bar);

	t.is(ctx, foo);
	await sleep(wait + 5);
	t.is(ctx, bar);
});

test('call with arguments', async t => {
	const wait = 100;

	let args;

	const logargs = function (...args_: unknown[]) {
		args = args_;
	};

	const throttled = throttle(logargs, wait);

	throttled.call(null, 1);
	throttled.call(null, 2);

	t.is(args?.[0], 1);
	await sleep(wait + 5);
	t.is(args?.[0], 2);
});
/* eslint-enable unicorn/no-this-assignment, no-useless-call */
