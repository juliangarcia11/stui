# API Module

This module contains all the code related to making API calls to the SpaceTraders API. It includes the API client, types, and any utility functions related to the API.

Types are generated using the OpenAPI specification provided by SpaceTraders. This ensures that our types are always up-to-date with the API and reduces the chances of errors when making API calls.

## Usage

### Provider

The `ApiProvider` component is used to wrap the entire application and provide the API client to all components. It's currently used in the `root.tsx` file.

### API Client

To use the API client, simply import the `$api` object from the `client.ts` file and use it to make API calls. The client is built using `openapi-react-query`, which provides a convenient way to manage API calls and caching.

```tsx
import { $api } from "~/api";

const MyComponent = () => {
  const { data, error, isLoading } = $api.useQuery("get", "/");

  if (isLoading || !data) return "Loading...";

  if (error) return `An error occured: ${error.message}`;

  return <div>{data.title}</div>;
};
```

### Types

Types are generated using the OpenAPI specification and can be found in the `types.ts` file. You can import these types to ensure type safety when working with API responses.

```ts
import type { operations } from "~/api";
type GetRootResponse =
  operations["get-status"]["responses"]["200"]["content"]["application/json"];
```

## Regenerating Types

If you need to regenerate the types (for example, if the API has changed), you can run the following command:

```bash
pnpm api:gen
```

## See it in Action

Add the `<TestConnectionCard />` component anywhere in the app to see the API client in action. It makes a simple request to the root endpoint and displays the response.
