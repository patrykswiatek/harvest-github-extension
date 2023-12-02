/**
 * Checks if an object has a specific property.
 *
 * @param {Obj} obj - The object to check.
 * @param {Prop} prop - The property to check for in the object.
 * @returns {obj is Obj & { [k in Prop]: unknown }} - True if the object has the specified property.
 */
export function isObjectWithProperty<Obj, Prop extends string>(
  obj: Obj,
  prop: Prop
): obj is Obj & { [k in Prop]: unknown } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.prototype.hasOwnProperty.call(obj, prop)
  )
}
