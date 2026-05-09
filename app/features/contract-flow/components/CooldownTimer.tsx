import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

function getRemainingSeconds(expiration: string): number {
  return Math.max(0, Math.floor((new Date(expiration).getTime() - Date.now()) / 1000));
}

export function CooldownTimer({ expiration }: { expiration: string }) {
  const [remaining, setRemaining] = useState(() => getRemainingSeconds(expiration));

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => {
      const secs = getRemainingSeconds(expiration);
      setRemaining(secs);
      if (secs <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [expiration]);

  if (remaining <= 0) {
    return (
      <Text size="1" color="green">
        Ready
      </Text>
    );
  }

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  return (
    <Text size="1" color="gray">
      {mins > 0 ? `${mins}m ` : ""}
      {secs}s
    </Text>
  );
}
