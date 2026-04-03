type LogParams = {
  key?: string;
  message: string;
  [k: string]: unknown;
};

/**
 * Currently a simple wrapper around console.log that standardizes the log format across the app.
 *
 * TODO:
 * - Consider adding pino or another logging library
 * - Add env var support to toggle logging levels (e.g. only log warnings and errors in production)
 */
export const log = ({ key, message, ...rest }: LogParams) => {
  const prefix = key ? `[${key}]` : "[LOG]";
  const messageStartsWithBracket = message.startsWith("[");
  const formattedMessage = messageStartsWithBracket ? message : ` ${message}`;
  if (
    typeof rest !== "undefined" &&
    rest !== null &&
    Object.keys(rest).length > 0
  ) {
    console.log(`${prefix}${formattedMessage}`, rest);
    return;
  }

  console.log(`${prefix}${formattedMessage}`);
};
