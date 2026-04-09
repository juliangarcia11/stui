import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, type ButtonProps } from "@radix-ui/themes";
import React from "react";

/**
 * Accordion Component
 * A reusable accordion component built using Radix UI's Accordion primitives.
 * It provides a simple API for creating collapsible sections of content.
 * The component is styled using Radix UI's Theme system and can be easily customized.
 * @see `ExampleAccordion` for usage example.
 */

type AccordionRootProps =
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps;
type AccordionItemProps = AccordionPrimitive.AccordionItemProps;
type AccordionTriggerProps = AccordionPrimitive.AccordionTriggerProps & {
  pt?: {
    button?: ButtonProps;
  };
};
type AccordionContentProps = AccordionPrimitive.AccordionContentProps;
type AccordionHeaderProps = AccordionPrimitive.AccordionHeaderProps;

// Accordion Root Component
const AccordionRoot = ({ children, ...props }: AccordionRootProps) => (
  <AccordionPrimitive.Root
    {...props}
    className="w-full rounded-md overflow-hidden"
  >
    {children}
  </AccordionPrimitive.Root>
);
AccordionRoot.displayName = "AccordionRoot";

// Accordion Header Component
const AccordionHeader = React.forwardRef<HTMLDivElement, AccordionHeaderProps>(
  ({ children, ...props }, ref) => (
    <AccordionPrimitive.Header ref={ref} {...props}>
      {children}
    </AccordionPrimitive.Header>
  ),
);
AccordionHeader.displayName = "AccordionHeader";

// Accordion Item Component
const AccordionItem = ({ children, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item {...props}>{children}</AccordionPrimitive.Item>
);
AccordionItem.displayName = "AccordionItem";

// Accordion Trigger Component
const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, ...props }, ref) => {
  const TriggerButton = (
    <Button radius="none" {...props.pt?.button}>
      {children}

      <ChevronLeftIcon className="group-hover:not-group-data-[state=open]:-rotate-90 group-data-[state=open]:-rotate-90 group-hover:group-data-[state=open]:rotate-0" />
    </Button>
  );

  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      {...props}
      className={"group " + (props.className ?? "")}
      asChild
    >
      {/* if custom styling props that could effect the layout are provided, */}
      {/* do not wrap TriggerButton with the Flex element for layout */}
      {props.pt?.button?.className || props.pt?.button?.style ? (
        TriggerButton
      ) : (
        <Flex
          px="2"
          align="center"
          justify="between"
          gap="2"
          width="100%"
          asChild
        >
          {TriggerButton}
        </Flex>
      )}
    </AccordionPrimitive.Trigger>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// Accordion Content Component
const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} {...props} asChild>
    <Flex
      direction="column"
      px="3"
      gap="2"
      style={{
        backgroundColor:
          props.style?.backgroundColor ?? "var(--color-panel-solid)",
        boxShadow: props.style?.boxShadow ?? "var(--shadow-1)",
      }}
    >
      {children}
    </Flex>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
export type {
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
};

export const ExampleAccordion = () => {
  return (
    <Accordion.Root type="single" defaultValue="item-1" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger>Item 1</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          This is the content for Item 1. You can place any content here.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Header>
          <Accordion.Trigger>Item 2</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          This is the content for Item 2. Add more details or components here.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Header>
          <Accordion.Trigger>Item 3</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          This is the content for Item 3. Customize it as needed.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
