import test from 'ava';
import {indent} from '../../src/index.js';

test('throw if count is a negative', t => {
	t.throws(() => {
		indent('foo', -1);
	}, {
		message: 'Expected `count` to be at least 0, got `-1`',
	});
});

test('indent each line in a string', t => {
	t.is(indent('foo\nbar'), ' foo\n bar');
	t.is(indent('foo\nbar', 1), ' foo\n bar');
	t.is(indent('foo\r\nbar', 2), '  foo\r\n  bar');
	t.is(indent('foo\nbar', 4), '    foo\n    bar');
});

test('not indent whitespace only lines', t => {
	t.is(indent('foo\nbar\n\nbaz', 1), ' foo\n bar\n\n baz');
});

test('indent with leading whitespace', t => {
	t.is(indent(' foo\n bar\n', 1), '  foo\n  bar\n');
});

test('indent with custom string', t => {
	t.is(indent('foo\nbar\n', 1, '♥'), '♥foo\n♥bar\n');
});

test('not indent when count is 0', t => {
	t.is(indent('foo\nbar\n', 0), 'foo\nbar\n');
});
