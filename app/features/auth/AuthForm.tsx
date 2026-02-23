import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Callout, Card, Flex, Heading } from "@radix-ui/themes";
import type { FC, PropsWithChildren } from "react";
import { useFetcher } from "react-router";
import { SubmitButton } from "~/components/form";

type AuthFormProps = {
  action: `/${string}`;
  ariaDescription: string;
  error?: string;
  header: string;
};

export const AuthForm: FC<PropsWithChildren<AuthFormProps>> = ({
  action,
  ariaDescription,
  error,
  header,
  children,
}) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      action={action}
      method="POST"
      aria-description={ariaDescription}
    >
      <Box maxWidth="fit-content" m="auto" asChild>
        <Card>
          <Flex direction="column" gap="3">
            <Heading as="h1">{header}</Heading>

            {children}

            {error?.length && <ErrorCallout error={error} />}
            <Box m="auto">
              <SubmitButton state={fetcher.state} />
            </Box>
          </Flex>
        </Card>
      </Box>
    </fetcher.Form>
  );
};

const ErrorCallout: FC<{ error: string }> = ({ error }) => (
  <Callout.Root color="red">
    <Callout.Icon>
      <ExclamationTriangleIcon />
    </Callout.Icon>
    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>
);
