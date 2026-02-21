import { type FlexProps, Flex, TextField, Text } from "@radix-ui/themes";
import type { FC, PropsWithChildren } from "react";
import { LabelledFormField } from "./LabelledFormField";
import { ErrorFormField } from "./ErrorFormField";

type TextFormFieldProps = FlexProps & {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
};

export const TextFormField: FC<TextFormFieldProps> = ({
  error,
  name,
  placeholder,
  ...rest
}) => (
  <ErrorFormField error={error}>
    <LabelledFormField name={name} {...rest}>
      <TextField.Root name={name} size="2" placeholder={placeholder} />
    </LabelledFormField>
  </ErrorFormField>
);
