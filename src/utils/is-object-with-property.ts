export function isObjectWithProperty<Obj, Prop extends string>(
  obj: Obj,
  prop: Prop,
): obj is Obj & { [k in Prop]: unknown } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.prototype.hasOwnProperty.call(obj, prop)
  )
}
