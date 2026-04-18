import { Button, type ButtonProps } from "@radix-ui/themes";
import type { FC } from "react";
import { Form, useFetcher, type FormProps } from "react-router";

type ButtonFormProps = Omit<ButtonProps, "type"> & {
  action?: FormProps["action"];
  method?: "GET" | "POST";
  hiddenValues: Record<string, string | number | readonly string[] | undefined>;
};

/**
 * A reusable form component that renders a button.
 * When the button is clicked, it submits the form to the specified action URL.
 * The button's name is set to the provided name prop, and its value is submitted with the form.
 * Useful for submitting search parameters or other data without needing a full form with user input fields.
 *
 * @example
 * <ButtonForm
 *   action="/search"
 *   hiddenValues={{ query: "example search" }}
 *   name="search"
 * >
 *   Search
 * </ButtonForm>
 * // This will send the user to `/search?query=example+search` when the button is clicked.
 *
 * @example
 * <ButtonForm
 *   action="/submit"
 *   method="POST"
 *   hiddenValues={{ id: 123 }}
 *   name="Delete"
 * >
 *  Delete
 * </ButtonForm>
 * // This will send a POST request to `/submit` with form data `id=123` when the button is clicked.
 */
export const ButtonForm: FC<ButtonFormProps> = ({
  action,
  method = "GET",
  hiddenValues,
  ...buttonProps
}) => {
  return (
    <Form action={action} method={method}>
      {Object.entries(hiddenValues).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <Button {...buttonProps} type="submit" />
    </Form>
  );
};

/**
 * A variant of ButtonForm that uses React Router's useFetcher to handle form submission without a full page reload.
 * This component is ideal for actions that should update the UI without navigating away from the current page.
 * It accepts the same props as ButtonForm, with an additional submittingText prop to indicate when the form is being submitted.
 * @see https://reactrouter.com/start/framework/actions#calling-actions-with-a-fetcher
 */
export const ButtonFetcherForm: FC<
  ButtonFormProps & {
    submittingText?: string;
  }
> = ({
  action,
  method = "GET",
  hiddenValues,
  children = "Submit",
  submittingText = "Submitting...",
  ...buttonProps
}) => {
  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  return (
    <fetcher.Form action={action} method={method}>
      {Object.entries(hiddenValues).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <Button {...buttonProps} type="submit" disabled={busy}>
        {busy ? submittingText : children}
      </Button>
    </fetcher.Form>
  );
};
