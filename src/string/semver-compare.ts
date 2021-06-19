export enum Comparison {
	Equals = 0,
	Greater = 1,
	Lesser = -1
}

type SemverParts = [string, string, string];

/**
 * Compare two semver verison string.
 *
 * @source Other libs
 * https://npm.im/semver-compare
 * https://npm.im/semiver
 *
 * @param versionA
 * @param versionB
 * @returns -1, 0, 1
 */
export function semverCompare(versionA: string, versionB: string): Comparison {
	const partsA = versionA.split('.') as SemverParts;
	const partsB = versionB.split('.') as SemverParts;

	for (let i = 0; i < 3; i++) {
		const a = Number(partsA[i]);
		const b = Number(partsB[i]);

		if (a > b) {
			return Comparison.Greater;
		}

		if (a < b) {
			return Comparison.Lesser;
		}
	}

	return Comparison.Equals;
}
