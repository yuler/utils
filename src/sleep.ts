import {Awaitable} from './types.js';

export async function sleep(ms: number, callback?: Awaitable<any>): Promise<void> {
	return new Promise<void>(resolve =>
		// eslint-disable-next-line no-promise-executor-return
		setTimeout(async () => {
			await callback?.();
			resolve();
		}, ms)
	);
}
