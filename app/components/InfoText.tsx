import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Text,
  type FlexProps,
  type IconProps,
  type TextProps,
} from "@radix-ui/themes";

type InfoTextProps = {
  pt?: {
    container: FlexProps;
    icon: IconProps;
    text: TextProps;
  };
  text: string;
};

export const InfoText = ({ pt, text }: InfoTextProps) => {
  return (
    <Flex align="center" gap="2" {...pt?.container}>
      <InfoCircledIcon height="2rem" width="2rem" {...pt?.icon} />
      <Text size="2" {...pt?.text}>
        {text}
      </Text>
    </Flex>
  );
};
