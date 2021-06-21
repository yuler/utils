const objectTypeNames = [
    'Function',

] as const

type ObjectTypeName = typeof objectTypeNames[number]

const isObejectTypeName = (name: unknown): name is ObjectTypeName => {
    return objectTypeNames.includes(name as ObjectTypeName);
}

const {toString} = Object.prototype
const getObjectType = (value: unknown): ObjectTypeName | undefined => {
    const objectTypeName = toString.call(value).slice(8, -1)

    if (isObejectTypeName(objectTypeName)) {
        return objectTypeName
    }

    return undefined
}

/**
 * Check if a value is a regular expression.
 *
 * @param input - value to check
 * @returns boolean
 */
export function isRegexp(input: unknown): input is RegExp {
	return Object.prototype.toString.call(input) === '[object RegExp]';
}
