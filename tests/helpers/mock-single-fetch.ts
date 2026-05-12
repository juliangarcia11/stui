import { encode } from "turbo-stream";
import type { Page } from "@playwright/test";

/**
 * Intercepts a React Router v7 single-fetch loader GET and returns
 * turbo-stream-encoded fixture data so that useFetcher.load() sees the mock.
 *
 * See docs/single-fetch-test-mocking.md for background and fragility notes.
 *
 * @param page      Playwright page
 * @param routePath The route's URL path, e.g. "/api/quickstart-context"
 * @param routeId   The route's internal RR id, e.g. "routes/api.quickstart-context"
 * @param data      The value the loader would have returned (plain JSON-serializable)
 */
export async function mockLoaderData(
  page: Page,
  routePath: string,
  routeId: string,
  data: unknown,
): Promise<void> {
  const envelope = { [routeId]: { data } };
  await page.route(
    (url) => url.pathname === `${routePath}.data`,
    async (route) => {
      const stream = encode(envelope);
      const body = await new Response(stream).text();
      await route.fulfill({
        status: 200,
        headers: {
          "Content-Type": "text/x-script",
          "X-Remix-Response": "yes",
        },
        body,
      });
    },
  );
}
