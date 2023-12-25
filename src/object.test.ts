import { describe, test, expect } from 'vitest'
import { pick } from './object'

describe('object ~> pick', () => {
  test('array predicate', () => {
    const pickKeys = Object.keys(pick({ foo: true, bar: false }, ['foo']))
    expect(pickKeys[0]).toBe('foo')
    expect(pickKeys.length).toBe(1)
  })

  test('__proto__ keys', () => {
    const input = { ['__proto__']: { foo: true } }
    expect(pick(input, ['__proto__'])).toEqual(input)
  })

  test('should omit undefineds', () => {
    const empty = {} as any
    expect(pick(empty, ['foo', 'bar', 'baz'])).toEqual(empty)
  })
})
