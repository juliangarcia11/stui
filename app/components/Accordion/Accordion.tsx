import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Flex, Button } from "@radix-ui/themes";
import React from "react";

type AccordionRootProps =
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps;
type AccordionItemProps = AccordionPrimitive.AccordionItemProps;
type AccordionTriggerProps = AccordionPrimitive.AccordionTriggerProps;
type AccordionContentProps = AccordionPrimitive.AccordionContentProps;

// Accordion Root Component
const AccordionRoot = ({ children, ...props }: AccordionRootProps) => (
  <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
);
AccordionRoot.displayName = "AccordionRoot";

// Accordion Item Component
const AccordionItem = ({ children, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item {...props}>{children}</AccordionPrimitive.Item>
);
AccordionItem.displayName = "AccordionItem";

// Accordion Trigger Component
const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Trigger ref={ref} {...props}>
    <Button variant="ghost">{children}</Button>
  </AccordionPrimitive.Trigger>
));
AccordionTrigger.displayName = "AccordionTrigger";

// Accordion Content Component
const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} {...props}>
    <Flex direction="column" gap="2">
      {children}
    </Flex>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
};

export const ExampleAccordion = () => {
  return (
    <Accordion.Root type="single" defaultValue="item-1" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>
          This is the content for Item 1. You can place any content here.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>
          This is the content for Item 2. Add more details or components here.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Content>
          This is the content for Item 3. Customize it as needed.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
