import { type FlexProps, Flex, Text } from "@radix-ui/themes";
import type { PropsWithChildren, FC } from "react";

export type LabelledFormFieldProps = PropsWithChildren &
  FlexProps & {
    label: string;
    name: string;
  };

/**
 * Wrap an item so that a label will be displayed above it
 */
export const LabelledFormField: FC<LabelledFormFieldProps> = ({
  children,
  label,
  name,
  direction,
  gap,
  ...flexProps
}) => (
  <Flex
    direction={direction ?? "column"}
    gap={getGap(direction, gap)}
    {...flexProps}
  >
    <Text as="label" htmlFor={name}>
      {label}
    </Text>

    {children}
  </Flex>
);

function getGap(
  direction: FlexProps["direction"] = "column",
  initialGap?: FlexProps["gap"],
) {
  if (direction === "column") {
    return initialGap ?? "1";
  } else {
    return initialGap ?? "3";
  }
}
