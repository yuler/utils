import test from 'ava';
import {isRegexp} from '../../src/index.js';

const toStringRegex = () => '[object RegExp]';

test('main', t => {
	t.true(isRegexp(/regexp/));
	t.true(isRegexp(new RegExp('regexp'))); // eslint-disable-line prefer-regex-literals
	t.false(isRegexp('regexp'));
	t.false(isRegexp(1));
	t.false(isRegexp(null));
	t.false(isRegexp({}));
	t.false(isRegexp([]));
	t.false(isRegexp({toString: toStringRegex}));
	t.false(isRegexp({__proto__: {toString: toStringRegex}}));
});
