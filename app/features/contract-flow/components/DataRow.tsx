import { Flex, Text } from "@radix-ui/themes";

type DataRowProps = { label: string; value: string };

export function DataRow({ label, value }: DataRowProps) {
  return (
    <Flex justify="between" gap="2">
      <Text size="1" color="gray">
        {label}
      </Text>
      <Text size="1" weight="medium" className="font-mono">
        {value}
      </Text>
    </Flex>
  );
}
