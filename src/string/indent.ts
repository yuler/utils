/**
 * Indent each line in a string w/o blank line.
 *
 * @source Other libs
 * https://npm.im/indent-string
 * https://npm.im/indent-string
 *
 * @param input - The string to indent
 * @param count - How many times you want repeated. Default: `1`
 * @param indent - The string to use for the indent. Default: ` `
 * @returns string
 */
export function indent(input: string, count = 1, indent = ' '): string {
	if (count < 0) {
		throw new RangeError(
			`Expected \`count\` to be at least 0, got \`${count}\``
		);
	}

	if (count === 0) {
		return input;
	}

	const regex = /^(?!\s*$)/gm;

	return input.replace(regex, indent.repeat(count));
}

