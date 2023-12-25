/**
 * Pick object keys and values into a new object.
 *
 * @source Other libs
 * https://npm.im/filter-obj
 * https://npm.im/lodash.pick
 * https://npm.im/only
 *
 * @param object - Source object to pick properties from.
 * @param keys - Property name that should be assigned to the new object.
 * @returns
 */
export function pick<
  ObjectType extends Record<string, any>,
  Keys extends keyof ObjectType,
>(object: ObjectType, keys: readonly Keys[]): Pick<ObjectType, Keys> {
  const result = {}

  for (const key of Object.values(keys)) {
    if (key in object) {
      Object.defineProperty(result, key, {
        value: object[key],
        writable: true,
        enumerable: true,
        configurable: true,
      })
    }
  }

  return result as Pick<ObjectType, Keys>
}

/**
 * Removes undefined values from an object.
 * @param object - The object to compact.
 * @returns A new object with undefined values removed.
 */
export function compact(object: Record<string, any>) {
  const result: Record<string, any> = {}

  for (const key in object) {
    const value = object[key]
    if (value !== undefined) {
      result[key] = value
    }
  }

  return result
}
