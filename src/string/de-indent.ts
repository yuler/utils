/**
 * Remove redundant indentation(whitespace or tab).
 *
 * @source Other libs
 * https://npm.im/strip-indent
 * https://npm.im/de-indent
 *
 * @param string
 * @returns
 */
export function deIndent(string: string): string {
	const match = string.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return string;
	}

	// Min indent number
	// eslint-disable-next-line unicorn/no-array-reduce
	const min = match.reduce((r, a) => Math.min(r, a.length), Number.POSITIVE_INFINITY);

	if (min === 0) {
		return string;
	}

	const regex = new RegExp(`^[ \\t]{${min}}`, 'gm');

	return string.replace(regex, '');
}
