import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Callout, Card, Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import { TextFormField } from "~/components";

export const LoginForm: FC<{ error?: string }> = ({ error }) => (
  <Card>
    <Heading as="h1">Login</Heading>

    <Box width="fit-content">
      <Flex direction="column" gap="3">
        <TextFormField
          name="username"
          label="Agent:"
          placeholder="Agent Name"
          direction="row"
          gap="3"
        />

        <TextFormField name="token" label="Token:" direction="row" />

        {error?.length && <LoginErrorCallout error={error} />}
      </Flex>
    </Box>
  </Card>
);

const LoginErrorCallout: FC<{ error: string }> = ({ error }) => (
  <Callout.Root color="red">
    <Callout.Icon>
      <ExclamationTriangleIcon />
    </Callout.Icon>
    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>
);
