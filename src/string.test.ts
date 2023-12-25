import { describe, test, expect } from 'vitest'
import { camelize, indent, deIndent, semverCompare } from './string'

test('string ~> camelize', () => {
  expect(camelize('foo')).toBe('foo')
  expect(camelize('foo-bar')).toBe('fooBar')
  expect(camelize('foo-bar-baz')).toBe('fooBarBaz')
  expect(camelize('foo--bar')).toBe('fooBar')
  expect(camelize('--foo-bar')).toBe('fooBar')
  expect(camelize('--foo--bar')).toBe('fooBar')
  expect(camelize('FOO-BAR')).toBe('fooBar')
  expect(camelize('-foo-bar-')).toBe('fooBar')
  expect(camelize('--foo--bar--')).toBe('fooBar')
  expect(camelize('foo.bar')).toBe('fooBar')
  expect(camelize('foo..bar')).toBe('fooBar')
  expect(camelize('..foo..bar..')).toBe('fooBar')
  expect(camelize('foo_bar')).toBe('fooBar')
  expect(camelize('__foo__bar__')).toBe('fooBar')
  expect(camelize('foo bar')).toBe('fooBar')
  expect(camelize('  foo  bar  ')).toBe('fooBar')
  expect(camelize('-')).toBe('')
  expect(camelize(' - ')).toBe('')
})

describe('string ~> indent', () => {
  test('throw if count is a negative', () => {
    // 'Expected `count` to be at least 0, got `-1`'
    expect(() => indent('foo', -1)).toThrowError()
  })
  test('indent each line in a string', () => {
    expect(indent('foo\nbar')).toBe(' foo\n bar')
    expect(indent('foo\nbar', 1)).toBe(' foo\n bar')
    expect(indent('foo\r\nbar', 2)).toBe('  foo\r\n  bar')
    expect(indent('foo\nbar', 4)).toBe('    foo\n    bar')
  })
  test('not indent whitespace only lines', () => {
    expect(indent('foo\nbar\n\nbaz', 1)).toBe(' foo\n bar\n\n baz')
  })
  test('indent with leading whitespace', () => {
    expect(indent(' foo\n bar\n', 1)).toBe('  foo\n  bar\n')
  })
  test('indent with custom string', () => {
    expect(indent('foo\nbar\n', 1, '♥')).toBe('♥foo\n♥bar\n')
  })
  test('not indent when count is 0', () => {
    expect(indent('foo\nbar\n', 0)).toBe('foo\nbar\n')
  })
})

describe('string ~> deIndent', () => {
  test('0 indent', () => {
    expect(deIndent('\nabc\n  bcd\n  cde\nefg')).toBe(
      '\nabc\n  bcd\n  cde\nefg',
    )
  })
  test('non-0 indent', () => {
    expect(deIndent('  abc\n    bcd\n  cde\n    efg')).toBe(
      'abc\n  bcd\ncde\n  efg',
    )
  })
  test('tabs', () => {
    expect(deIndent('\tabc\n\t\tbcd\n\tcde\n\t\tefg')).toBe(
      'abc\n\tbcd\ncde\n\tefg',
    )
  })
  test('single line', () => {
    expect(deIndent('\n  <h1 class="red">title</h1>\n')).toBe(
      '\n<h1 class="red">title</h1>\n',
    )
  })
})

describe('string ~> semverCompare', () => {
  test('semver compare equal', () => {
    expect(semverCompare('0.0.0', '0.0.0')).toBe(0)
    expect(semverCompare('1.2.3', '1.2.3')).toBe(0)
  })

  test('semver compare lesser than', () => {
    expect(semverCompare('0.0.0', '0.0.1')).toBe(-1)
    expect(semverCompare('0.0.0', '0.1.0')).toBe(-1)
    expect(semverCompare('1.9.0', '2.1.0')).toBe(-1)
    expect(semverCompare('1.9.0', '1.9.1')).toBe(-1)
    expect(semverCompare('1.0.0', '10.0.0')).toBe(-1)
    expect(semverCompare('8.9.0', '10.0.0')).toBe(-1)
  })

  test('semver compare greater than', () => {
    expect(semverCompare('0.0.1', '0.0.0')).toBe(1)
    expect(semverCompare('0.1.0', '0.0.0')).toBe(1)
    expect(semverCompare('2.1.0', '1.9.0')).toBe(1)
    expect(semverCompare('1.9.1', '1.9.0')).toBe(1)
    expect(semverCompare('10.0.0', '1.0.0')).toBe(1)
    expect(semverCompare('10.0.0', '8.9.0')).toBe(1)
  })
})
