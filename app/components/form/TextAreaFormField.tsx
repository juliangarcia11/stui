import {
  Box,
  type FlexProps,
  TextArea,
  type TextAreaProps,
} from "@radix-ui/themes";
import type { FC } from "react";
import { ErrorFormField } from "./ErrorFormField";
import { LabelledFormField } from "./LabelledFormField";

type TextAreaFormFieldProps = FlexProps & {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  size?: TextAreaProps["size"];
};

/**
 * Formatted TextArea Field for use in Forms
 */
export const TextAreaFormField: FC<TextAreaFormFieldProps> = ({
  name,
  placeholder,
  error,
  size = "2",
  ...rest
}) => (
  <ErrorFormField error={error}>
    <LabelledFormField name={name} {...rest}>
      <Box minWidth="25vw">
        <TextArea name={name} size={size} placeholder={placeholder} />
      </Box>
    </LabelledFormField>
  </ErrorFormField>
);
