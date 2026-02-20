import { Container } from "@radix-ui/themes";
import type { FC, PropsWithChildren } from "react";

/**
 * Wrapper component for debugging purposes. It can be used to display state, props, or any other information in a styled container.
 * The container has a border and padding to visually separate it from other content, making it easier to identify and read the debug information.
 * Border color matches the accent color from the theme, ensuring it stands out while still fitting within the overall design.
 *
 * @example
 * <Debug>
 *   This is a debug component showing some state or props.
 * </Debug>
 *
 * @example
 * <Debug>
 *   {JSON.stringify(someState, null, 2)}
 * </Debug>
 */
export const Debug: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      size="1"
      style={{
        margin: "1rem",
        padding: "1rem",
        border: "1px solid var(--accent-9)",
        borderRadius: "var(--radius-3)",
      }}
    >
      {typeof children === "string" ? <pre>{children}</pre> : children}
    </Container>
  );
};
