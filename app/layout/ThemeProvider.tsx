import { Theme, ThemePanel } from "@radix-ui/themes";
import { ThemeProvider as NextThemeProvider } from "next-themes";

/**
 * ThemeProvider
 * Wraps the application with the Next.js ThemeProvider and Radix UI Theme components.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system">
      <Theme>
        {children}
        <ThemePanel />
      </Theme>
    </NextThemeProvider>
  );
};
