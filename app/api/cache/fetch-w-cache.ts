import { Config } from "~/config";
import { log } from "~/utils";
import { cache } from "./cache";

export const fetchWithCache: typeof fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  // When the hey-api client calls fetch(Request, undefined), extract method from the Request.
  const method =
    input instanceof Request ? input.method : (init?.method ?? "GET");

  if (method.toUpperCase() !== "GET") {
    return fetch(input, init);
  }

  const cacheKey = generateCacheKey(input, init);

  const cached = cache.get(cacheKey);
  if (cached) {
    log({ key: "CACHE", message: `[HIT][${cached.count ?? 0}][${cacheKey}]` });
    cache.set(cacheKey, { ...cached, count: (cached.count || 0) + 1 });
    return new Response(cached.body, cached.init);
  }

  const response = await fetch(input, init);

  if (response.ok) {
    const body = await response.blob();
    const responseInit: ResponseInit = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    };

    cache.set(cacheKey, { body, init: responseInit, timestamp: Date.now() });
    log({ key: "CACHE", message: `[STORE][${cacheKey}]` });

    return new Response(body, responseInit);
  }

  return response;
};

const generateCacheKey = (
  input: RequestInfo | URL,
  init?: RequestInit,
): string => {
  let url: string;
  let authHeader = "";

  if (input instanceof Request) {
    url = input.url;
    // Include the Authorization header so different agents don't share cache entries.
    authHeader = input.headers.get("Authorization") ?? "";
  } else {
    url = typeof input === "string" ? input : input.href;
  }

  const options = init ? JSON.stringify(init) : "";
  let key = url.replace(Config.ApiUrl, "");
  key += options ? `:${options}` : "";
  if (authHeader) key += `:${authHeader}`;
  return key;
};
