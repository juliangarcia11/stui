import { Select } from "@radix-ui/themes";
import type { FC } from "react";
import { FactionSymbol } from "~/api/client";
import { TextFormField } from "~/components";
import { ErrorFormField, LabelledFormField } from "~/components/form";
import { AuthForm } from "./AuthForm";

const FACTIONS = Object.values(FactionSymbol).map((value) => ({
  label: value.slice(0, 1) + value.slice(1).toLowerCase(),
  value: value,
}));

export const RegistrationForm: FC<{ error?: string }> = ({ error }) => (
  <AuthForm
    header="New Agent Registration"
    ariaDescription="agent registration form"
    action="/register"
    error={error}
  >
    <TextFormField
      name="symbol"
      label="Agent: "
      placeholder="Agent Name"
      direction="row"
      gap="4"
    />

    <FactionSelectInput />
  </AuthForm>
);

/**
 * Select dropdown input for Factions.
 * Not made for reuse.
 * Does not show previous selected values.
 */
const FactionSelectInput = () => (
  <ErrorFormField>
    <LabelledFormField label="Faction:" name="faction" direction="row" gap="2">
      <Select.Root name="faction">
        <Select.Trigger placeholder="Select a faction" />
        <Select.Content>
          {FACTIONS.map(({ label, value }) => (
            <Select.Item key={value} value={value}>
              {label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </LabelledFormField>
  </ErrorFormField>
);
