import { Section } from "@radix-ui/themes";
import type { FC } from "react";
import { Outlet } from "react-router";
import { AppContainer } from "~/components";
import { Config } from "~/config";

/**
 * Layout container for the authentication routes
 */
const AuthLayout: FC = () => {
  return (
    <AppContainer title={Config.AppTitleLong} pages={Config.AuthFeaturePages}>
      <Section size="1">
        <Outlet />
      </Section>
    </AppContainer>
  );
};

export default AuthLayout;
