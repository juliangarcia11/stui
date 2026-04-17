import { Flex, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

export type StepState = "complete" | "active" | "upcoming";

type StepRowProps = {
  state: StepState;
  label: string;
  summary?: string;
  children?: ReactNode;
};

const STEP_ICON: Record<StepState, string> = {
  complete: "✓",
  active: "●",
  upcoming: "○",
};

export function StepRow({ state, label, summary, children }: StepRowProps) {
  return (
    <div
      className="py-2 border-b border-(--gray-4) last:border-0"
      role="listitem"
    >
      <Flex align="center" gap="2">
        <Text
          size="1"
          color="gray"
          weight={state === "active" ? "bold" : "regular"}
          className={`shrink-0 w-3 text-center${state === "active" ? " text-(--accent-11)" : ""}`}
        >
          {STEP_ICON[state]}
        </Text>
        <Text
          size="2"
          color={state === "upcoming" ? "gray" : undefined}
          weight={state === "active" ? "bold" : "regular"}
          className={state === "upcoming" ? "opacity-50" : ""}
          truncate
        >
          {state === "complete" && summary ? summary : label}
        </Text>
      </Flex>
      {state === "active" && children && (
        <div className="mt-2 ml-5">{children}</div>
      )}
    </div>
  );
}
