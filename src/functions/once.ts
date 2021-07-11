const calledFunctions = new WeakMap<any, number>();

/**
 * Ensure a function is only called once.
 * When called multiple times it will return the return value from the first call.
 *
 * @param fn - Function that should only be called once.
 * @param throwable - Throw an error when called more than once. Default is false.
 * @returns A function that only calls `fn` once.
 */
export function once<ArgumentsType extends unknown[], ReturnType>(
	fn: (...args: ArgumentsType) => ReturnType,
	throwable = false,
): (...args: ArgumentsType) => ReturnType {
	let result: ReturnType;
	let callCount = 0;
	// **Non-standard** `displayName` is property returns the display name of the function.
	// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName
	const functionName = (fn as {displayName?: string}).displayName ?? fn.name ?? '<anonymous>';

	const onced = function (this: any, ...args: ArgumentsType): ReturnType {
		calledFunctions.set(onced, ++callCount);

		if (callCount === 1) {
			result = fn.apply(this, args);
		} else if (throwable) {
			throw new Error(`Function \`${functionName}\` can only be called once`);
		}

		return result;
	};

	calledFunctions.set(onced, callCount);

	return onced;
}

/**
 * Get the number of times `fn` has been called.
 *
 * @param fn - Function to get call count from.
 * @returns A number representing how many times `fn` has been called.
 *
 * @example
 * ```
 * import onetime from 'onetime';
 * const foo = onetime(() => {});
 * foo();
 * foo();
 * foo();
 * console.log(onetime.callCount(foo));
 * //=> 3
 * ```
 */
once.callCount = (
	fn: (...args: unknown[]) => unknown,
): number => {
	if (!calledFunctions.has(fn)) {
		throw new Error(`The given function \`${fn.name}\` is not wrapped by the \`once\` package`);
	}

	// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
	return calledFunctions.get(fn) as number;
};
