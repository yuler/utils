/**
 * Convert a dash/dot/underscore/space separated string to camel case.
 *
 * @source Other libs
 * https://npm.im/camelcase
 *
 * @param input - String to convert camel case
 * @returns string
 */
export function camelize(input: string): string {
	return input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (_, p1) => (p1 as string).toUpperCase())
		.replace(/\d+(\w|$)/g, m => m.toUpperCase());
}
