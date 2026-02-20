import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import type { FC } from "react";

/**
 * ThemeToggle
 * A button component that toggles between light and dark themes using the next-themes library.
 */
export const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  const toggleTheme = () => {
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <Button onClick={toggleTheme} style={{ width: "fit-content" }}>
      {isLight ? <MoonIcon /> : <SunIcon />} Toggle Theme
    </Button>
  );
};
