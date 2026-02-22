import { Container, Section, TabNav, Text } from "@radix-ui/themes";
import type { FC } from "react";
import { NavLink, Outlet } from "react-router";

/**
 * Layout container for the authentication routes
 */
const AuthLayout: FC = () => {
  return (
    <Container size="2">
      {/* navigate between both auth tabs */}
      <TabNav.Root m="auto">
        <NavLink to="/login">
          {({ isActive }) => (
            <TabNav.Link asChild active={isActive}>
              <Text weight="bold">Login</Text>
            </TabNav.Link>
          )}
        </NavLink>
        <NavLink to="/register">
          {({ isActive }) => (
            <TabNav.Link asChild active={isActive}>
              <Text weight="bold">Register</Text>
            </TabNav.Link>
          )}
        </NavLink>
      </TabNav.Root>

      {/* auth tab outlet */}
      <Section size="1">
        <Outlet />
      </Section>
    </Container>
  );
};

export default AuthLayout;
