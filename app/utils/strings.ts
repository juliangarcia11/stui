export const bigIntToString = (_: string, value: unknown) =>
  typeof value === "bigint" ? value.toString() : value;

export const stringifyWithBigInt = (
  data: unknown,
  space: string | number = 2,
) => JSON.stringify(data, bigIntToString, space);

export const capitalizeWords = (message: string) => {
  const words = message.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
  return capitalizedWords.join(" ");
};
