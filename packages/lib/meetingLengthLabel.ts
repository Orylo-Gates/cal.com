/** Label for a meeting length on the booking page, for example "45 min" or "2 h". */
export function meetingLengthLabel(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) {
    return `${hours} h`;
  }
  return `${hours}h${rest}`;
}
