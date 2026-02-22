import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Callout, Card, Em, Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import { useFetcher } from "react-router";
import { TextFormField } from "~/components";
import { SubmitButton, TextAreaFormField } from "~/components/form";

export const LoginForm: FC<{ error?: string }> = ({ error }) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      action="/login"
      method="POST"
      aria-description="agent login form"
    >
      <Box maxWidth="fit-content" m="auto" asChild>
        <Card>
          <Flex direction="column" gap="3">
            <Heading as="h1">Welcome back, agent!</Heading>
            <TextFormField
              name="username"
              label="Agent:"
              placeholder="Agent Name"
              direction="row"
              gap="3"
            />
            <TextAreaFormField
              name="token"
              label="Token:"
              direction="row"
              placeholder="A long string of letters and numbers..."
            />
            {error?.length && <LoginErrorCallout error={error} />}
            <Box m="auto">
              <SubmitButton state={fetcher.state} />
            </Box>
          </Flex>
        </Card>
      </Box>
    </fetcher.Form>
  );
};

const LoginErrorCallout: FC<{ error: string }> = ({ error }) => (
  <Callout.Root color="red">
    <Callout.Icon>
      <ExclamationTriangleIcon />
    </Callout.Icon>
    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>
);
