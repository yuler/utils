/**
 * Remove redundant indentation(whitespace or tab).
 *
 * @source Other libs
 * https://npm.im/strip-indent
 * https://npm.im/de-indent
 *
 * @param input - String to remove redundant indentation
 * @returns string
 */
export function deIndent(input: string): string {
	const match = input.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return input;
	}

	// Min indent number
	// eslint-disable-next-line unicorn/no-array-reduce
	const min = match.reduce((r, a) => Math.min(r, a.length), Number.POSITIVE_INFINITY);

	if (min === 0) {
		return input;
	}

	const regex = new RegExp(`^[ \\t]{${min}}`, 'gm');

	return input.replace(regex, '');
}
