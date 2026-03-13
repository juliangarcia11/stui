import { useMemo } from "react";
import { useSearchParams } from "react-router";

type MatcherFunction = (value: string) => boolean;

type UseParamsOptions<TKeys extends string> = {
  /**
   * An array of strings representing the keys of the URL search parameters to manage.
   */
  keys: TKeys[];
  /**
   * An optional object where each key corresponds to a parameter key and the value is a function that validates the parameter's value.
   * If a parameter value does not pass the validation, it will be treated as undefined.
   */
  matchers?: Partial<Record<TKeys, MatcherFunction>>;
};

type TKeyParams<TKeys extends string> = Record<TKeys, string | undefined>;

type UseParamsReturn<TKeys extends string> = {
  /**
   * An object containing the current values of the specified URL search parameters.
   */
  params: TKeyParams<TKeys>;
  /**
   * A function that checks if a specific parameter key has a defined value in the URL search parameters.
   * @param key - The parameter key to check.
   * @returns A boolean indicating whether the parameter has a defined value.
   */
  has: (key: TKeys) => boolean;
  /**
   * A function to update the URL search parameters. It accepts an object where each key is a parameter key and the value is the new value for that parameter.
   * If a value is undefined, null, or an empty string, the corresponding parameter will be removed from the URL.
   * @param newParams - An object containing the new values for the specified parameters.
   */
  setParams: (newParams: Partial<TKeyParams<TKeys>>) => void;
};

export type { MatcherFunction, TKeyParams };

/**
 * Custom React hook to manage URL search parameters based on a specified set of keys and optional matcher functions.
 */
export function useParams<TKeys extends string>(
  options: UseParamsOptions<TKeys>,
): UseParamsReturn<TKeys> {
  const { keys, matchers } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const result = keys.map((key) => {
      const value = searchParams.get(key) ?? undefined;
      if (value === undefined) return [key, undefined] as const;
      if (matchers && matchers[key] && !matchers[key](value)) {
        return [key, undefined] as const;
      }
      return [key, value] as const;
    });
    return Object.fromEntries(result) as TKeyParams<TKeys>;
  }, [searchParams, keys, matchers]);

  const has = (key: TKeys) => {
    const value = params[key];
    return value !== undefined;
  };

  const setParams = (newParams: Partial<TKeyParams<TKeys>>) => {
    setSearchParams((prev) => {
      Object.entries(newParams).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === null ||
          value.toString().trim() === ""
        ) {
          prev.delete(key);
        } else {
          prev.set(key, `${value}`);
        }
      });
      return prev;
    });
  };

  return { params, has, setParams };
}
