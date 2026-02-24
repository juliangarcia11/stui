import type { FC } from "react";
import { TextFormField } from "~/components";
import { TextAreaFormField } from "~/components/form";
import { AuthForm } from "./AuthForm";

/**
 * Form to login to the SpaceTraders API
 */
export const LoginForm: FC<{ error?: string }> = ({ error }) => (
  <AuthForm
    header="Welcome back, agent!"
    ariaDescription="agent login form"
    action="/login"
    error={error}
  >
    <TextFormField
      name="symbol"
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
  </AuthForm>
);
