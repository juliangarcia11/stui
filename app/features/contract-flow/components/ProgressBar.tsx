import { Flex, Text } from "@radix-ui/themes";

type ProgressBarProps = {
  completed: number;
  total: number;
};

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <Flex direction="column" gap="1">
      <div className="h-1.5 rounded-full overflow-hidden bg-(--gray-4)">
        <div
          className="h-full rounded-full bg-(--accent-9) transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <Text size="1" color="gray">
        {completed}/{total} complete
      </Text>
    </Flex>
  );
}
