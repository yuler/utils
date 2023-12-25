const calledFunctions = new WeakMap<any, number>()
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
  let result: ReturnType
  let callCount = 0
  // **Non-standard** `displayName` is property returns the display name of the function.
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName
  const functionName =
    (fn as { displayName?: string }).displayName ?? fn.name ?? '<anonymous>'

  const onced = function (this: any, ...args: ArgumentsType): ReturnType {
    calledFunctions.set(onced, ++callCount)

    if (callCount === 1) {
      result = fn.apply(this, args)
    } else if (throwable) {
      throw new Error(`Function \`${functionName}\` can only be called once`)
    }

    return result
  }

  calledFunctions.set(onced, callCount)

  return onced
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
once.callCount = (fn: (...args: unknown[]) => unknown): number => {
  if (!calledFunctions.has(fn)) {
    throw new Error(
      `The given function \`${fn.name}\` is not wrapped by the \`once\` function`,
    )
  }

  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  return calledFunctions.get(fn) as number
}

export interface DebouncedFunction<
  ArgumentsType extends unknown[],
  ReturnType,
> {
  (...args: ArgumentsType): ReturnType
  cancel(): void
}
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
 *	- lodash.debounce
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
  immediate = false,
): DebouncedFunction<ArgumentsType, ReturnType> {
  let timeout: number | undefined
  let result: ReturnType

  const debounced = function (this: any, ...args: ArgumentsType) {
    const later = () => {
      timeout = undefined
      if (!immediate) {
        result = fn.apply(this, args)
      }
    }

    const shouldCallNow = immediate && !timeout

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)

    if (shouldCallNow) {
      result = fn.apply(this, args)
    }

    return result
  }

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
  }

  return debounced
}

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
  let timeout: number | undefined
  let result: ReturnType
  let last = 0

  const throttled = function (this: any, ...args: ArgumentsType) {
    const call = () => {
      timeout = undefined
      last = Date.now()
      result = fn.apply(this, args)
    }

    const delta = Date.now() - last

    if (!timeout) {
      if (delta >= wait) {
        call()
      } else {
        timeout = setTimeout(call, wait - delta)
      }
    }

    return result
  }

  return throttled
}
