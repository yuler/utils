import { describe, test, expect } from 'vitest'
import { debounce, once, throttle } from './function'
import { sleep } from './async'

describe('function ~> once', () => {
  // Copy tests from onetime
  // ref: https://github.com/sindresorhus/onetime/blob/e5fd86f2303546a2d9cc82f2a72c3ea840f6a2dc/test.js
  test('call function once', () => {
    let i = 0
    const fixture = once(() => ++i)
    expect(fixture()).toBe(1)
    expect(fixture()).toBe(1)
    expect(fixture()).toBe(1)
  })

  test('option to throw is called more than once', () => {
    const fixture = once(() => {}, true)
    fixture()
    // {message: /Function .* can only be called once/}
    expect(fixture).toThrowError()
  })

  test('`callCount` method', () => {
    const fixture = once(() => {})
    expect(once.callCount(fixture)).toBe(0)
    fixture()
    fixture()
    fixture()
    expect(once.callCount(fixture)).toBe(3)
  })

  test('`callCount` method - throw on non-onetime-wrapped functions', () => {
    const fixture = () => {}
    // {message: /not wrapped/}
    expect(() => once.callCount(fixture)).toThrowError()
  })
})

describe('function ~> debounce', () => {
  test('debounces a function', async () => {
    let count = 0

    const debounced = debounce(value => {
      count++
      return value
    }, 20)

    expect(debounced(1)).toBe(undefined)
    expect(debounced(2)).toBe(undefined)
    expect(debounced(3)).toBe(undefined)

    await sleep(100)
    expect(debounced(4)).toBe(3)
    expect(debounced(5)).toBe(3)
    expect(debounced(6)).toBe(3)
    expect(count).toBe(1)

    await sleep(200)
    expect(count).toBe(2)
  })

  test('debounced with immediate true', async () => {
    let count = 0

    const debounced = debounce(
      value => {
        count++
        return value
      },
      20,
      true,
    )

    expect(debounced(1)).toBe(1)
    expect(debounced(2)).toBe(1)
    expect(debounced(3)).toBe(1)
    expect(count).toBe(1)

    await sleep(100)
    expect(debounced(4)).toBe(4)
    expect(debounced(5)).toBe(4)
    expect(debounced(6)).toBe(4)
    expect(count).toBe(2)

    await sleep(200)
    expect(count).toBe(2)
  })

  test('.cancel() method', async () => {
    let count = 0

    const debounced = debounce(value => {
      count++
      return value
    }, 20)

    expect(debounced(1)).toBe(undefined)
    expect(debounced(2)).toBe(undefined)
    expect(debounced(3)).toBe(undefined)

    debounced.cancel()

    await sleep(100)
    expect(debounced(1)).toBe(undefined)
    expect(debounced(2)).toBe(undefined)
    expect(debounced(3)).toBe(undefined)
    expect(count).toBe(0)
  })
})

describe('function ~> throttle', () => {
  test('throttles a function', async () => {
    const wait = 100
    const total = 500
    let count = 0

    const throttled = throttle(() => {
      count++
    }, wait)

    const interval = setInterval(throttled, 20)

    await sleep(total + 5)

    clearInterval(interval)

    expect(count).toBe(total / wait)
  })

  test('call function last time', async () => {
    const wait = 100
    let count = 0

    const throttled = throttle(() => {
      count++
    }, wait)

    throttled()
    throttled()

    expect(count).toBe(1)
    await sleep(wait + 5)
    expect(count).toBe(2)
  })

  test('call with context', async () => {
    const wait = 100

    let ctx: any
    const foo = {}
    const bar = {}

    const logCtx = function (this: any) {
      ctx = this
    }

    const throttled = throttle(logCtx, wait)

    throttled.call(foo)
    throttled.call(bar)

    expect(ctx).toBe(foo)
    await sleep(wait + 5)
    expect(ctx).toBe(bar)
  })

  test('call with arguments', async () => {
    const wait = 100

    let args

    const logArgs = function (...args_: unknown[]) {
      args = args_
    }

    const throttled = throttle(logArgs, wait)

    throttled.call(null, 1)
    throttled.call(null, 2)

    expect(args?.[0]).toBe(1)
    await sleep(wait + 5)
    expect(args?.[0]).toBe(2)
  })
})
