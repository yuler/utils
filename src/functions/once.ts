const calledFunctions = new WeakMap();

export function once<ArgumentsType extends unknown[], ReturnType>(
	fn: (...args: ArgumentsType) => ReturnType,
	throwable = false
): (...args: ArgumentsType) => ReturnType {
	let result: ReturnType;
	let callCount = 0;
	// **Non-standard** `displayName` is property returns the display name of the function.
	// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName
	const functionName = (fn as {displayName?: string}).displayName ?? fn.name ?? '<anonymous>';

	const onced = function (this: any, ...args: ArgumentsType) {
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

once.callCount = (
	fn: (...args: unknown[]) => unknown
): number => {
	if (!calledFunctions.has(fn)) {
		throw new Error(`The given function \`${fn.name}\` is not wrapped by the \`once\` package`);
	}

	return calledFunctions.get(fn);
};

export interface oncedFunction<ArgumentsType extends unknown[], ReturnType> {
	(...args: ArgumentsType): ReturnType;
	callCount(fn: (...args: any[]) => unknown): number;
}
