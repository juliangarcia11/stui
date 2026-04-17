import { Config } from "~/config";
import { QuickstartPanel } from "~/features/contract-flow/QuickstartPanel";
import { Outlet } from "react-router";
import { AppContainer } from "./AppContainer";

/**
 * Layout component for all pages not in the Auth feature
 */
export default function AppPageLayout() {
  return (
    <AppContainer title={Config.AppTitleLong} pages={Config.Pages}>
      <Outlet />
      <QuickstartPanel />
    </AppContainer>
  );
}
