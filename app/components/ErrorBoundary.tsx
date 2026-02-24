import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Flex, Heading, Text } from "@radix-ui/themes";
import { useNavigate, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleRetry = () => {
    // Reload the current route to retry the loader
    navigate(0);
  };

  return (
    <Box maxWidth="fit-content" m="auto" asChild>
      <Callout.Root color="red" size="3">
        <Callout.Icon style={{ marginTop: "auto", marginBottom: "auto" }}>
          <ExclamationTriangleIcon width="4rem" height="4rem" />
        </Callout.Icon>
        <Callout.Text>
          <Flex direction="column" gap="4" p="4">
            <Heading as="h2" size="6">
              Something went wrong
            </Heading>
            <Text align="center">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred."}
            </Text>
            <Flex gap="2" justify="end">
              <Button
                highContrast
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button variant="solid" onClick={handleRetry}>
                Retry
              </Button>
            </Flex>
          </Flex>
        </Callout.Text>
      </Callout.Root>
    </Box>
  );
}
