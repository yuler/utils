/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @see [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 *
 * @source Other libs
 *	- underscore's debounce
 *	- loadsh.debounce
 *	- debounce
 *  - throttle-debounce
 *	- debounce-fn
 *
 * @param fn Function to debounce.
 * @param wait Timeout in ms, default is 0.
 * @param immediate Trigger the function on the leading edge of the `wait` interval.
 * @returns A debounced function.
 */
export function debounce<ArgumentsType extends unknown[], ReturnType>(
	fn: (...args: ArgumentsType) => ReturnType,
	wait = 0,
	immediate = false
): DebouncedFunction<ArgumentsType, ReturnType> {
	let timeout: NodeJS.Timeout | undefined;
	let result: ReturnType;

	const debounced = function (this: any, ...args: ArgumentsType) {
		const later = () => {
			timeout = undefined;
			if (!immediate) {
				result = fn.apply(this, args);
			}
		};

		const shouldCallNow = immediate && !timeout;

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(later, wait);

		if (shouldCallNow) {
			result = fn.apply(this, args);
		}

		return result;
	};

	debounced.cancel = function () {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
	};

	return debounced;
}

export interface DebouncedFunction<ArgumentsType extends unknown[], ReturnType> {
	(...args: ArgumentsType): ReturnType;
	cancel(): void;
}
