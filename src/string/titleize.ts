/**
 * Capitalize every word in a string.
 *
 * @param input - String to titleize
 * @returns string
 */
export function titleize(input: string): string {
	return input.toLowerCase()
		.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}
