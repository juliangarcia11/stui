import { WaypointType } from "~/api/client";
import { Select } from "@radix-ui/themes";
import { capitalizeWords } from "~/utils";
import { useParams } from "~/hooks";

const TYPE_OPTIONS: { label: string; value: WaypointType }[] = Object.values(
  WaypointType,
).map((type) => ({
  label: capitalizeWords(type.replace(/_/g, " ")),
  value: type,
}));

const WaypointsTypeSelect: React.FC<{
  value?: WaypointType;
  onChange: (value?: WaypointType) => void;
}> = ({ value, onChange }) => {
  return (
    <Select.Root
      onValueChange={(newValue) => {
        if (newValue === "all") {
          onChange(undefined);
        } else {
          onChange(newValue as WaypointType);
        }
      }}
      value={value ?? "all"}
    >
      <Select.Trigger>
        {value ? capitalizeWords(value) : "All Types"}
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="all">All Types</Select.Item>
        {TYPE_OPTIONS.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

/**
 * Custom hook to connect the WaypointsTypeSelect component to URL search parameters for filtering waypoints by type.
 * This hook will read the current "type" search parameter from the URL, provide a way to update it, and return the current type filter value.
 * The WaypointsTypeSelect component can use this hook to sync its state with the URL, allowing users to share filtered views via URL.
 */
const useWaypointsTypeFilter = () => {
  const { params, setParams } = useParams({
    keys: ["type"],
  });

  const handleTypeChange = (newType?: WaypointType) => {
    setParams({ type: newType });
  };

  return {
    typeFilter: params.type as WaypointType | undefined,
    handleTypeChange,
  };
};

/**
 * Component that renders a select dropdown for filtering waypoints by type.
 */
export const WaypointsTypeFilter: React.FC = () => {
  const { typeFilter, handleTypeChange } = useWaypointsTypeFilter();
  return <WaypointsTypeSelect value={typeFilter} onChange={handleTypeChange} />;
};
