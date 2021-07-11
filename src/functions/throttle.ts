/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 * Taken from https://github.com/component/throttle/blob/master/index.js MIT licensed
 *
 * @param fn Function to throttle.
 * @param wait Number of milliseconds that must elapse between `fn` invocations.
 * @returns A throttled function.
 */
export function throttle<ArgumentsType extends unknown[], ReturnType>(
	fn: (...args: ArgumentsType) => ReturnType,
	wait: number,
): (...args: ArgumentsType) => ReturnType {
	let timeout: NodeJS.Timeout | undefined;
	let result: ReturnType;
	let last = 0;

	const throttled = function (this: any, ...args: ArgumentsType) {
		const call = () => {
			timeout = undefined;
			last = Date.now();
			result = fn.apply(this, args);
		};

		const delta = Date.now() - last;

		if (!timeout) {
			if (delta >= wait) {
				call();
			} else {
				timeout = setTimeout(call, wait - delta);
			}
		}

		return result;
	};

	return throttled;
}
