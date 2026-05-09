import { Flex, Text } from "@radix-ui/themes";
import { type ReactNode, useState } from "react";
import type { StepState } from "../types";

export type { StepState };

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
  const [expanded, setExpanded] = useState(false);

  const isClickable = state === "complete" && !!children;
  const showContent =
    state === "active" || (state === "complete" && expanded);

  return (
    <div
      className="py-2 border-b border-(--gray-4) last:border-0"
      role="listitem"
      aria-current={state === "active" ? "step" : undefined}
    >
      <Flex
        align="center"
        gap="2"
        className={isClickable ? "cursor-pointer select-none" : ""}
        onClick={isClickable ? () => setExpanded((e) => !e) : undefined}
      >
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
        {isClickable && (
          <Text size="1" color="gray" className="ml-auto shrink-0">
            {expanded ? "▲" : "▼"}
          </Text>
        )}
      </Flex>
      {showContent && children && (
        <div className="mt-2 ml-5">{children}</div>
      )}
    </div>
  );
}
