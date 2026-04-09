import { Heading, Text } from "@radix-ui/themes";
import type { FC } from "react";

export const QuickstartPageHeader: FC<{ symbol: string }> = ({ symbol }) => (
  <Heading size="4" align="center">
    <Text weight="regular">Welcome to </Text>
    <Text style={{ color: "var(--accent-11)" }}>STUI</Text>
    <Text weight="regular">, Agent </Text>
    <Text style={{ color: "var(--accent-11)" }}>{symbol}</Text>
    <Text weight="regular">{"!"}</Text>
  </Heading>
);
