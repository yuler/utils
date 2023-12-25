import { test, expect } from 'vitest'
import { isRegexp } from './is'

test('describe ~> isRegexp', () => {
  const toStringRegex = () => '[object RegExp]'
  expect(isRegexp(/regexp/)).toBeTruthy()
  expect(isRegexp(new RegExp('regexp'))).toBeTruthy()
  expect(isRegexp('regexp')).toBeFalsy()
  expect(isRegexp(1)).toBeFalsy()
  expect(isRegexp(null)).toBeFalsy()
  expect(isRegexp({})).toBeFalsy()
  expect(isRegexp([])).toBeFalsy()
  expect(isRegexp({ toString: toStringRegex })).toBeFalsy()
  expect(isRegexp({ __proto__: { toString: toStringRegex } })).toBeFalsy()
})
