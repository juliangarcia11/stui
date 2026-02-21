import { type FlexProps, TextField } from "@radix-ui/themes";
import type { FC } from "react";
import { ErrorFormField } from "./ErrorFormField";
import { LabelledFormField } from "./LabelledFormField";

type TextFormFieldProps = FlexProps & {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
};

/**
 * Formatted Text Field for use in Forms
 */
export const TextFormField: FC<TextFormFieldProps> = ({
  name,
  placeholder,
  error,
  ...rest
}) => (
  <ErrorFormField error={error}>
    <LabelledFormField name={name} {...rest}>
      <TextField.Root name={name} size="2" placeholder={placeholder} />
    </LabelledFormField>
  </ErrorFormField>
);
