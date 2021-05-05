const test = require("ava");
// import sleep  from '../src/sleep.js';

test('foo', t => {
	t.pass();
});

test('bar', async t => {
	const bar = Promise.resolve('bar');
	t.is(await bar, 'bar');
});

// test.cb('sleep callback test', async t => {
// 	await sleep(1000, t.end)
// });

// test('sleep', async t => {
// 	const pre = Date.now();
// 	await sleep(1000, noop);
// 	const diff = Date.now() - pre;
// 	t(diff).toBeGreaterThanOrEqual(1000);
// 	t(diff).toBeLessThanOrEqual(1050);
// 	t(noop.)
// });
