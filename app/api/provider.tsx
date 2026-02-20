import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

/**
 * Provides the API client to the app using React Query's context. This allows
 * components to use the $api client for making API requests and managing server state.
 */
export function ApiProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
