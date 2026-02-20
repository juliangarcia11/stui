import { Card, Container, Heading } from "@radix-ui/themes";

export const DashboardCard = () => {
  return (
    <Container size="4">
      <Card size="5" className="border-2 border-(--accent-9)">
        <Heading as="h1" size="7">
          Dashboard
        </Heading>
        <p>
          Welcome to the dashboard! This is where you can find an overview of
          your data and activities.
        </p>
      </Card>
    </Container>
  );
};
