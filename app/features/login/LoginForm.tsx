import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Callout, Card, Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import { useFetcher } from "react-router";
import { TextFormField } from "~/components";
import { SubmitButton, TextAreaFormField } from "~/components/form";

export const LoginForm: FC<{ error?: string }> = ({ error }) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/login" method="POST">
      <Box maxWidth="fit-content" asChild>
        <Card>
          <Flex direction="column" gap="3">
            <Heading as="h1">Login</Heading>
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
