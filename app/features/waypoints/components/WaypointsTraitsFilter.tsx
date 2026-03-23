// TODO: This series of components is getting a bit large, consider splitting into multiple files for clarity and maintainability
// TODO: Add "Show all" option that clears all trait filters when selected
// TODO: Add search input to filter traits by name
import {
  Box,
  Button,
  CheckboxCards,
  ChevronDownIcon,
  Dialog,
  Flex,
  Grid,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import { createContext, useContext, useEffect, useState } from "react";
import { WaypointTraitSymbol } from "~/api/client";
import { useParams } from "~/hooks";
import { capitalizeWords } from "~/utils";

type TraitsFilterContextType = {
  selectedTraits: WaypointTraitSymbol[];
  toggleTrait: (trait: WaypointTraitSymbol) => void;
  updateQueryParams: () => void;
};

const TraitsFilterContext = createContext<TraitsFilterContextType | undefined>(
  undefined,
);

export const TraitsFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { params, setParams } = useParams({
    keys: ["traits"],
  });
  const [selectedTraits, setSelectedTraits] = useState<WaypointTraitSymbol[]>(
    params.traits ? (params.traits.split(",") as WaypointTraitSymbol[]) : [],
  );

  const toggleTrait = (trait: WaypointTraitSymbol) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait],
    );
  };

  const updateQueryParams = () => {
    setParams({
      traits: selectedTraits.length > 0 ? selectedTraits.join(",") : undefined,
    });
  };

  // Sync selected traits with URL parameters on initial load and when params change
  useEffect(() => {
    if (params.traits) {
      setSelectedTraits(params.traits.split(",") as WaypointTraitSymbol[]);
    } else {
      setSelectedTraits([]);
    }
  }, [params.traits]);

  return (
    <TraitsFilterContext.Provider
      value={{ selectedTraits, toggleTrait, updateQueryParams }}
    >
      {children}
    </TraitsFilterContext.Provider>
  );
};

export const useTraitsFilter = () => {
  const context = useContext(TraitsFilterContext);
  if (!context) {
    throw new Error(
      "useTraitsFilter must be used within a TraitsFilterProvider",
    );
  }
  return context;
};

const TRAITS_OPTIONS: {
  label: string;
  value: WaypointTraitSymbol;
  description?: string;
}[] = Object.values(WaypointTraitSymbol).map((trait) => ({
  label: capitalizeWords(trait.replace(/_/g, " ")),
  value: trait,
  description: `Description for ${trait}`,
}));

const TraitsCards = () => {
  const { selectedTraits, toggleTrait } = useTraitsFilter();

  return (
    <CheckboxCards.Root size="1" value={selectedTraits}>
      <Grid columns="3" align="center" gap="2">
        {TRAITS_OPTIONS.map((trait) => (
          <CheckboxCards.Item
            key={trait.value}
            value={trait.value}
            className="whitespace-nowrap"
            onClick={() => toggleTrait(trait.value)}
          >
            {trait.label}
          </CheckboxCards.Item>
        ))}
      </Grid>
    </CheckboxCards.Root>
  );
};

const FilterDialog = ({ children }: { children: React.ReactElement }) => {
  const { selectedTraits, updateQueryParams } = useTraitsFilter();
  const label =
    selectedTraits.length === 0 ||
    selectedTraits.length === TRAITS_OPTIONS.length
      ? "All Traits"
      : selectedTraits.length === 1
        ? capitalizeWords(selectedTraits[0]!.replace(/_/g, " "))
        : `${selectedTraits.length} Traits Selected`;

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="surface"
          color="gray"
          style={{ backgroundColor: "transparent" }}
        >
          <Text weight="regular" style={{ color: "var(--gray-12)" }}>
            {label}
          </Text>
          <ChevronDownIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="fit-content">
        <Dialog.Title>Filter by Traits</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Select traits to filter the waypoints. You can select multiple traits
          to narrow down your search.
        </Dialog.Description>

        <ScrollArea type="always" scrollbars="vertical">
          <Box height="50vh" px="4">
            {children}
          </Box>
        </ScrollArea>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={updateQueryParams}>Filter</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

/**
 * Component that provides a UI for filtering waypoints based on their traits.
 * It uses a dialog to display trait options as checkbox cards, allowing users to select multiple traits.
 * The selected traits are synced with URL search parameters to enable sharing and bookmarking of filtered views.
 */
export const WaypointsTraitsFilter = () => {
  return (
    <TraitsFilterProvider>
      <FilterDialog>
        <TraitsCards />
      </FilterDialog>
    </TraitsFilterProvider>
  );
};
