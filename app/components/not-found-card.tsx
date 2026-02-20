import {
  Container,
  Heading,
  Card,
  Flex,
  type ContainerProps,
} from "@radix-ui/themes";
import type { FC } from "react";

type NotFoundCardProps = {
  title?: string;
  subtitle?: string;
  containerSize?: ContainerProps["size"] | false;
};

/**
 * A simple 404 Not Found card component
 * Can be used in a route or anywhere you want to display a not found message.
 * @param title - The title of the not found message (default: "404 - Not Found")
 * @param subtitle - The subtitle of the not found message (default: "The page you are looking for could not be found.")
 * @param containerSize - The size of the container (default: "2"). Set to false to render without a Radix Container.
 */
export const NotFoundCard: FC<NotFoundCardProps> = ({
  title = "404 - Not Found",
  subtitle = "The page you are looking for could not be found.",
  containerSize = "2",
}) => {
  const content = (
    <Card size="5" className="border-2 border-(--accent-9)">
      <Flex direction="column" align="center" gap="4" className="text-center">
        <Heading size="6">{title}</Heading>
        <p>{subtitle}</p>
      </Flex>
    </Card>
  );

  if (!containerSize) {
    return content;
  }

  return <Container size={containerSize}>{content}</Container>;
};
