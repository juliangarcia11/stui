import { Button, Flex, Text } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import { CollapsedTab } from "./components/CollapsedTab";
import { ProgressBar } from "./components/ProgressBar";
import { StepRow } from "./components/StepRow";
import { AcceptContractStep } from "./steps/AcceptContractStep";
import { AgentOverviewStep } from "./steps/AgentOverviewStep";
import { StartingLocationStep } from "./steps/StartingLocationStep";
import { CONTRACT_FLOW_STEPS } from "./steps";
import type { ContractFlowContext } from "./types";
import { numberWithCommas } from "~/utils/numbers";

type QuickstartContextData = {
  context: ContractFlowContext | null;
  dismissed: boolean;
  dismissedContractId: string | null;
};

export function QuickstartPanel() {
  const contextFetcher = useFetcher<QuickstartContextData>();
  const actionFetcher = useFetcher<{ status: string }>();

  useEffect(() => {
    contextFetcher.load("/api/quickstart-context");
  }, []);

  // Reload context whenever an action completes
  const prevActionState = useRef(actionFetcher.state);
  useEffect(() => {
    const prev = prevActionState.current;
    prevActionState.current = actionFetcher.state;
    if (
      prev !== "idle" &&
      actionFetcher.state === "idle" &&
      actionFetcher.data != null
    ) {
      contextFetcher.load("/api/quickstart-context");
    }
  }, [actionFetcher.state, actionFetcher.data]);

  const data = contextFetcher.data;
  if (!data?.context) return null;

  const { context, dismissed } = data;
  const steps = CONTRACT_FLOW_STEPS;
  const activeStepIndex = steps.findIndex((step) => !step.isComplete(context));
  const completedCount =
    activeStepIndex === -1 ? steps.length : activeStepIndex;

  const STEP_CONTENT: Partial<Record<string, React.ReactNode>> = {
    "agent-overview": <AgentOverviewStep ctx={context} />,
    "starting-location": <StartingLocationStep ctx={context} />,
    "accept-contract": <AcceptContractStep ctx={context} />,
  };

  const deliver = context.contract.terms.deliver?.[0];
  const STEP_SUMMARIES: Partial<Record<string, string>> = {
    "agent-overview": `${context.agent.symbol} · ${numberWithCommas(Number(context.agent.credits))} ¢`,
    "starting-location": `${context.systemSymbol} · ${context.waypoints.find((w) => w.symbol === context.agent.headquarters)?.type ?? ""}`,
    "accept-contract": deliver
      ? `${context.contract.factionSymbol} · ${deliver.tradeSymbol} ×${deliver.unitsRequired}`
      : context.contract.factionSymbol,
  };

  if (dismissed) {
    return (
      <CollapsedTab
        completedSteps={completedCount}
        totalSteps={steps.length}
        onExpand={() => {
          actionFetcher.submit(
            { action: "REOPEN_QUICKSTART", contractId: context.contract.id },
            { method: "POST", action: "/api/contract-flow" },
          );
        }}
      />
    );
  }

  return (
    <div
      className="fixed right-0 top-0 bottom-0 w-72 z-50 flex flex-col bg-(--color-panel-solid) border-l border-(--gray-5) shadow-xl"
      role="region"
      aria-label="Quickstart Progress"
    >
      {/* Header */}
      <Flex
        align="center"
        justify="between"
        p="3"
        className="border-b border-(--gray-5) shrink-0"
      >
        <Text size="2" weight="bold">
          ☆ Quickstart
        </Text>
        <actionFetcher.Form method="POST" action="/api/contract-flow">
          <input type="hidden" name="action" value="DISMISS_QUICKSTART" />
          <input type="hidden" name="contractId" value={context.contract.id} />
          <Button
            type="submit"
            variant="ghost"
            size="1"
            aria-label="Dismiss quickstart"
          >
            ✕
          </Button>
        </actionFetcher.Form>
      </Flex>

      {/* Step list */}
      <div className="flex-1 overflow-y-auto px-3 py-2" role="list">
        {steps.map((step, i) => {
          const state =
            activeStepIndex === -1 || i < activeStepIndex
              ? "complete"
              : i === activeStepIndex
                ? "active"
                : "upcoming";
          return (
            <StepRow
              key={step.key}
              state={state}
              label={step.label}
              summary={STEP_SUMMARIES[step.key]}
            >
              {STEP_CONTENT[step.key] ?? (
                <Text size="1" color="gray">
                  Step content coming soon
                </Text>
              )}
            </StepRow>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-(--gray-5) shrink-0">
        <ProgressBar completed={completedCount} total={steps.length} />
      </div>
    </div>
  );
}
