import { Button, Card, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { getStatus, type GetStatusResponses } from "~/client";
import { Debug } from "~/components";
import { stringifyWithBigInt } from "~/utils";

export const TestClientCard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GetStatusResponses[200]>();

  const onFetch = async () => {
    setLoading(true);
    const { data } = await getStatus();
    setData(JSON.parse(stringifyWithBigInt(data)));
    setLoading(false);
  };

  return (
    <Card>
      <Heading size="3">Client test</Heading>
      <Debug>{JSON.stringify({ data, loading }, null, 2)}</Debug>
      <Button onClick={onFetch} loading={loading}>
        Fetch status
      </Button>
    </Card>
  );
};
