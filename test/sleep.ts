import test from 'ava';
import sleep from '../src/sleep.js';

test('callback execute', async t => {
	await sleep(1000, () => {
		t.pass();
	});
});

test('slept 50 ms', async t => {
	const start = Date.now();
	await sleep(50);
	const gap = Date.now() - start;
	t.true(gap > 30 && gap < 70, `is slept ${gap}`);
});
