import test from 'ava';
import {debounce, sleep} from '../src/index.js';

test('debounces a function', async t => {
	let count = 0;

	const debounced = debounce(value => {
		count++;
		return value;
	}, 20);

	t.is(debounced(1), undefined);
	t.is(debounced(2), undefined);
	t.is(debounced(3), undefined);

	await sleep(100);
	t.is(debounced(4), 3);
	t.is(debounced(5), 3);
	t.is(debounced(6), 3);
	t.is(count, 1);

	await sleep(200);
	t.is(count, 2);
});

test('debounced with immediate ture', async t => {
	let count = 0;

	const debounced = debounce(value => {
		count++;
		return value;
	}, 20, true);

	t.is(debounced(1), 1);
	t.is(debounced(2), 1);
	t.is(debounced(3), 1);
	t.is(count, 1);

	await sleep(100);
	t.is(debounced(4), 4);
	t.is(debounced(5), 4);
	t.is(debounced(6), 4);
	t.is(count, 2);

	await sleep(200);
	t.is(count, 2);
});

test('.cancel() method', async t => {
	let count = 0;

	const debounced = debounce(value => {
		count++;
		return value;
	}, 20);

	t.is(debounced(1), undefined);
	t.is(debounced(2), undefined);
	t.is(debounced(3), undefined);

	debounced.cancel();

	await sleep(100);
	t.is(debounced(1), undefined);
	t.is(debounced(2), undefined);
	t.is(debounced(3), undefined);
	t.is(count, 0);
});
