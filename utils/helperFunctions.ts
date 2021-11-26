export const isTwoObjectsFieldsTheSame = (
  obj1: object,
  obj2: object,
  fields: Array<string>
): boolean => {
  return fields.every((field) => obj1[field] === obj2[field]);
};
export const capitalize = (s: string) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";
