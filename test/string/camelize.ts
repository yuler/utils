import test from 'ava';
import {camelize} from '../../src/index.js';

test('camelize', t => {
	t.is(camelize('foo'), 'foo');
	t.is(camelize('foo-bar'), 'fooBar');
	t.is(camelize('foo-bar-baz'), 'fooBarBaz');
	t.is(camelize('foo--bar'), 'fooBar');
	t.is(camelize('--foo-bar'), 'fooBar');
	t.is(camelize('--foo--bar'), 'fooBar');
	t.is(camelize('FOO-BAR'), 'fooBar');
	t.is(camelize('-foo-bar-'), 'fooBar');
	t.is(camelize('--foo--bar--'), 'fooBar');
	t.is(camelize('foo.bar'), 'fooBar');
	t.is(camelize('foo..bar'), 'fooBar');
	t.is(camelize('..foo..bar..'), 'fooBar');
	t.is(camelize('foo_bar'), 'fooBar');
	t.is(camelize('__foo__bar__'), 'fooBar');
	t.is(camelize('foo bar'), 'fooBar');
	t.is(camelize('  foo  bar  '), 'fooBar');
	t.is(camelize('-'), '');
	t.is(camelize(' - '), '');
});
