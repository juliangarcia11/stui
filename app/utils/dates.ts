import { formatDistanceStrict, isPast, subDays } from "date-fns";

/**
 * Formats a date as a relative time string (e.g., "3 days ago", "in 2 hours")
 */
export const formatRelativeDate = (
  date: Date | string,
  today: Date | string = new Date(),
): string => {
  return formatDistanceStrict(date, today, { addSuffix: true });
};
