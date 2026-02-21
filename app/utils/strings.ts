export const bigIntToString = (_: string, value: unknown) =>
  typeof value === "bigint" ? value.toString() : value;

export const stringifyWithBigInt = (
  data: unknown,
  space: string | number = 2,
) => JSON.stringify(data, bigIntToString, space);
