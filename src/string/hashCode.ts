/**
 * Javascript implementation of Java’s String.hashCode() method
 * refs: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method
 * refs: https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#hashCode--
 *
 * Returns a hash code for a string.
 * @param string string
 * @returns number
 */
export function hashCode(string: string) {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		hash = (hash << 5) - hash + string.charCodeAt(i);
		hash = Math.trunc(hash); // Convert to 32bit integer
	}

	return hash;
}
