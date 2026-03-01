import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Flex, Heading, Text } from "@radix-ui/themes";
import type { FC } from "react";
import { NavLink, useNavigate, useRouteError } from "react-router";

const TOKEN_RESET_ERROR_MESSAGE = "Token reset_date does not match the server";

/**
 * A React component that serves as an error boundary for route errors in a React Router application.
 * Logic component.
 */
export function ErrorBoundary() {
  const error = useRouteError();
  const isTokenResetError =
    error instanceof Error && error.message.includes(TOKEN_RESET_ERROR_MESSAGE);
  const title = isTokenResetError ? "Server reset has occured" : undefined;
  const message = isTokenResetError
    ? "Please register an agent to begin a new session."
    : error instanceof Error
      ? error.message
      : "An unexpected error occurred.";

  return (
    <ErrorCallout title={title} message={message}>
      {isTokenResetError ? <RegistrationRedirectActions /> : <RetryActions />}
    </ErrorCallout>
  );
}

type ErrorCalloutProps = {
  calloutSize?: Callout.RootProps["size"];
  children: React.ReactNode; // action buttons or additional content
  maxWidth?: string;
  message?: string;
  title?: string;
};

/**
 * A reusable callout component for displaying error messages.
 * UI component.
 */
const ErrorCallout: FC<ErrorCalloutProps> = ({
  calloutSize = "3",
  children,
  maxWidth = "80vw",
  message = "An unexpected error occurred.",
  title = "Something went wrong",
}) => {
  return (
    <Box maxWidth={maxWidth} m="auto" asChild>
      <Callout.Root color="red" size={calloutSize}>
        <Callout.Icon style={{ marginTop: "auto", marginBottom: "auto" }}>
          <ExclamationTriangleIcon width="4rem" height="4rem" />
        </Callout.Icon>
        <Callout.Text>
          <Flex direction="column" gap="4" p="4">
            <Heading as="h2" size="6">
              {title}
            </Heading>

            <Text align="center">{message}</Text>

            {children}
          </Flex>
        </Callout.Text>
      </Callout.Root>
    </Box>
  );
};

/**
 * Action buttons for general errors. Shows "Back" and "Retry" buttons.
 * "Back" navigates to the previous page, while "Retry" reloads the current route.
 */
const RetryActions = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Reload the current route to retry the loader
    navigate(0);
  };

  return (
    <Flex gap="2" justify="end">
      <Button highContrast variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Button variant="solid" onClick={handleRetry}>
        Retry
      </Button>
    </Flex>
  );
};

/**
 * Action button footer for token reset errors.
 * Shows a single button that redirects to the registration page.
 */
const RegistrationRedirectActions = () => {
  return (
    <Flex justify="end">
      <NavLink to="/register">
        {({ isPending }) => (
          <Button
            type="button"
            variant="solid"
            loading={isPending}
            disabled={isPending}
          >
            {isPending ? "Redirecting..." : "Go to Registration"}
          </Button>
        )}
      </NavLink>
    </Flex>
  );
};
