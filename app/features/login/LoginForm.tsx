import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Callout, Card, Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import { TextFormField } from "~/components";
import { TextAreaFormField } from "~/components/form";

export const LoginForm: FC<{ error?: string }> = ({ error }) => (
  <Box maxWidth="fit-content" asChild>
    <Card>
      <Box maxWidth="fit-content" asChild>
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
        </Flex>
      </Box>
    </Card>
  </Box>
);

const LoginErrorCallout: FC<{ error: string }> = ({ error }) => (
  <Callout.Root color="red">
    <Callout.Icon>
      <ExclamationTriangleIcon />
    </Callout.Icon>
    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>
);
