import test from 'ava';
import {semverCompare} from '../../src/index.js';

test('semver compare equal', t => {
	t.is(semverCompare('0.0.0', '0.0.0'), 0);
	t.is(semverCompare('1.2.3', '1.2.3'), 0);
});

test('semver compare lesser than', t => {
	t.is(semverCompare('0.0.0', '0.0.1'), -1);
	t.is(semverCompare('0.0.0', '0.1.0'), -1);
	t.is(semverCompare('1.9.0', '2.1.0'), -1);
	t.is(semverCompare('1.9.0', '1.9.1'), -1);
	t.is(semverCompare('1.0.0', '10.0.0'), -1);
	t.is(semverCompare('8.9.0', '10.0.0'), -1);
});

test('semver compare greater than', t => {
	t.is(semverCompare('0.0.1', '0.0.0'), 1);
	t.is(semverCompare('0.1.0', '0.0.0'), 1);
	t.is(semverCompare('2.1.0', '1.9.0'), 1);
	t.is(semverCompare('1.9.1', '1.9.0'), 1);
	t.is(semverCompare('10.0.0', '1.0.0'), 1);
	t.is(semverCompare('10.0.0', '8.9.0'), 1);
});
