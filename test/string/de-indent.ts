import test from 'ava';
import {deIndent} from '../../src/index.js';

test('0 indent', t => {
	t.is(deIndent('\nabc\n  bcd\n  cde\nefg'), '\nabc\n  bcd\n  cde\nefg');
});

test('non-0 indent', t => {
	t.is(deIndent('  abc\n    bcd\n  cde\n    efg'), 'abc\n  bcd\ncde\n  efg');
});

test('tabs', t => {
	t.is(deIndent('\tabc\n\t\tbcd\n\tcde\n\t\tefg'), 'abc\n\tbcd\ncde\n\tefg');
});

test('single line', t => {
	t.is(deIndent('\n  <h1 class="red">title</h1>\n'), '\n<h1 class="red">title</h1>\n');
});
