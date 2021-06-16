/**
 * Conver string to capital case.
 *
 * @param input - String to convert capital case
 * @returns string
 */
export function capitalize(input: string): string {
	return input.charAt(0).toLowerCase() + input.slice(1);
}
