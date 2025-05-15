/**
 * Checks if a date string is within the optional range
 */
export function isInRange(
  dateStr: string,
  startDate?: Date,
  endDate?: Date,
): boolean {
  const currentDate = new Date(dateStr);
  if (startDate && currentDate < startDate) return false;
  if (endDate && currentDate > endDate) return false;
  return true;
}
