import { Button, type ButtonProps } from "@radix-ui/themes";
import type { FC } from "react";

type State = "idle" | "loading" | "submitting";

type SubmitButtonProps = {
  state?: State;
  color?: ButtonProps["color"];
};

const LabelMap: Record<State, string> = {
  idle: "Submit",
  loading: "Loading...",
  submitting: "Submitting...",
} as const;

/**
 * Form submit button pre-styled & tied to a state prop
 */
export const SubmitButton: FC<SubmitButtonProps> = ({
  state = "idle",
  color = "grass",
}) => {
  return (
    <Button type="submit" color={color} disabled={state !== "idle"}>
      {LabelMap[state]}
    </Button>
  );
};
