import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Flex, Tooltip, Text, type TextProps } from "@radix-ui/themes";
import type { FC } from "react";

/**
 * A simple component that renders an info icon with a tooltip.
 * If the `text` prop is empty or only contains whitespace, it renders nothing.
 * Otherwise, it renders the info icon, and when hovered, it shows the tooltip with the provided text.
 */
export const HelpTip: FC<{ text?: string }> = ({ text }) =>
  !text?.trim().length ? null : (
    <Tooltip content={text}>
      <InfoCircledIcon />
    </Tooltip>
  );

/**
 * Text label with a help tooltip to the right.
 * Text props can be passed via `textProps` for additional styling or behavior.
 */
export const TextWithHelp: FC<{
  text: string;
  textProps?: TextProps;
  helpText?: string;
}> = ({ text, textProps, helpText }) => (
  <Flex direction="row" align="center" gap="2" asChild>
    <Text as="span" {...textProps}>
      {text} <HelpTip text={helpText} />
    </Text>
  </Flex>
);
