import { Config } from "~/config";
import type { ApiError } from "~/types";
import type { Meta } from "./client";

/**
 * Util that formats success response json
 */
export const wrapSuccess = <T = unknown>(data: T) =>
  ({ status: "success", data }) as const;

/**
 * Util that formats error response json
 */
export const wrapErr = (message: string) =>
  ({ status: "error", message }) as const;

/**
 * Util that pulls error messages from items we hope are ApiErrors
 */
export const extractApiErr = (e: unknown) => (e as ApiError).error.message;

/**
 * Util to create a header json object to drop into the client function calls
 */
export const buildAuth = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

type DataResponse<T> = {
  data: T;
};

type ListDataResponse<T> = {
  data: {
    data: T[];
    meta: Meta;
  };
};

/**
 * Util to standardize the API response handling across the app.
 * It checks for errors and missing data, and formats the response in a way that's easy for the UI to consume.
 * Optionally, you can provide a custom data extractor function if the data is nested in a different way than the default.
 *
 * @example
 * type MyData = { foo: string };
 * const response = await clientFunction(); // from `/app/client`
 * const standardizedResponse = standardizeApiResponse<MyData>(response);
 * if (standardizedResponse.status === "error") {
 *   // Handle error
 * } else {
 *   // Use standardizedResponse.data.foo
 * }
 */
export const standardizeApiResponse = <
  T = unknown,
  R extends { error?: unknown; data?: DataResponse<T> | ListDataResponse<T> } =
    any,
>(
  response: R,
  dataExtractor: (response: R) => T = (response) =>
    (response.data as any).data as T,
) => {
  if (response.error) return wrapErr(extractApiErr(response.error));
  if (!response.data) return Config.Errors.MissingData;

  // Check if the response matches the List<T> structure
  const listData = (response.data as any).data;
  const meta = (response.data as any).meta;
  if (Array.isArray(listData) && meta) {
    return wrapSuccess({ data: listData, meta });
  }

  return wrapSuccess(dataExtractor(response));
};
