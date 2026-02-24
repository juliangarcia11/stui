import { Config } from "~/config";
import { AppContainer } from "./AppContainer";
import { Outlet } from "react-router";

/**
 * Layout component for all pages not in the Auth feature
 */
export default function AppPageLayout() {
  return (
    <AppContainer title={Config.AppTitleLong} pages={Config.Pages}>
      <Outlet />
    </AppContainer>
  );
}
