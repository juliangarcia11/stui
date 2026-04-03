import { getCacheDump, getCacheSize } from "~/api/cache";
import { formatRelativeDate } from "~/utils";

/**
 * Dev route to inspect the contents of the cache. Only available in development mode.
 * Displays the cache entries with their keys, timestamps, ages, usage counts, and a preview of the cached body.
 * Useful for testing and debugging the caching mechanism implemented in app/api/cache.
 */
export async function loader() {
  if (!import.meta.env.DEV) {
    throw new Response("Not Found", { status: 404 });
  }

  const size = getCacheSize();
  const dump = getCacheDump();
  let entries = [];
  for (const [key, val] of dump) {
    const text = await val.value.body.text();
    const timestamp = new Date(val.value.timestamp).toISOString();
    entries.push({
      key,
      ts: timestamp,
      age: formatRelativeDate(timestamp),
      count: val.value.count ?? 0,
      preview: text.length > 100 ? text.slice(0, 100) + "..." : text,
    });
  }

  return Response.json({ size, entries });
}
