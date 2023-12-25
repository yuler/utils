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
    .replace(/\d+(\w|$)/g, m => m.toUpperCase())
}

/**
 * Conver string to capital case.
 *
 * @param input - String to convert capital case
 * @returns string
 */
export function capitalize(input: string): string {
  return input.charAt(0).toLowerCase() + input.slice(1)
}

/**
 * Capitalize every word in a string.
 *
 * @param input - String to titleize
 * @returns string
 */
export function titleize(input: string): string {
  return input.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase())
}

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
  const match = input.match(/^[ \t]*(?=\S)/gm)

  if (!match) {
    return input
  }

  // Min indent number
  // eslint-disable-next-line unicorn/no-array-reduce
  const min = match.reduce(
    (r, a) => Math.min(r, a.length),
    Number.POSITIVE_INFINITY,
  )

  if (min === 0) {
    return input
  }

  const regex = new RegExp(`^[ \\t]{${min}}`, 'gm')

  return input.replace(regex, '')
}

/**
 * Javascript implementation of Java’s String.hashCode() method
 * refs: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method
 * refs: https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#hashCode--
 *
 * Returns a hash code for a string.
 *
 * @param input string
 * @returns number
 */
export function hashCode(input: string) {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash = Math.trunc(hash) // Convert to 32bit integer
  }

  return hash
}

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
      `Expected \`count\` to be at least 0, got \`${count}\``,
    )
  }

  if (count === 0) {
    return input
  }

  const regex = /^(?!\s*$)/gm

  return input.replace(regex, indent.repeat(count))
}

export enum Comparison {
  Equals = 0,
  Greater = 1,
  Lesser = -1,
}

type SemverParts = [string, string, string]
/**
 * Compare two semver version string.
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
  const partsA = versionA.split('.') as SemverParts
  const partsB = versionB.split('.') as SemverParts

  for (let i = 0; i < 3; i++) {
    const a = Number(partsA[i])
    const b = Number(partsB[i])

    if (a > b) {
      return Comparison.Greater
    }

    if (a < b) {
      return Comparison.Lesser
    }
  }

  return Comparison.Equals
}
