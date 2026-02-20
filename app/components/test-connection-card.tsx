import { Card, Heading } from "@radix-ui/themes";
import { $api } from "../api/client";
import { Debug } from "~/components";

/**
 * TestConnectionCard is a React component that tests the connection to the API by making a simple GET request to the root endpoint ("/").
 * It uses the $api client to perform the request and displays the loading state, any errors, and the response data in a styled card.
 * This component is intended for development and debugging purposes to verify that the API connection is working correctly.
 */
export const TestConnectionCard = () => {
  const { data, error, isLoading } = $api.useQuery("get", "/");

  if (process.env.NODE_ENV === "development") {
    console.debug("TestConnectionCard - data:", data);
    console.debug("TestConnectionCard - error:", error);
    console.debug("TestConnectionCard - isLoading:", isLoading);
  } else {
    return null; // Don't render anything in production
  }

  return (
    <Card>
      <Heading size="3">
        {isLoading ? "Testing connection..." : "Connection test"}
      </Heading>

      {error && <Debug>{JSON.stringify(error, null, 2)}</Debug>}
      {data && <Debug>{JSON.stringify(data, null, 2)}</Debug>}
    </Card>
  );
};
