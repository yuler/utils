import { describe, test, expect, vi } from 'vitest';
import { sleep } from './async';

describe('async ~> sleep', () => {
	test('callback execute', async () => {
		const fn = vi.fn()
		await sleep(1000, fn);
		expect(fn.mock.calls.length).toBe(1);
	});

	test('slept 50 ms', async () => {
		const start = Date.now();
		await sleep(50);
		const gap = Date.now() - start;
		expect(gap > 30 && gap < 70, `is slept ${gap}`).toBeTruthy();
	});
})


