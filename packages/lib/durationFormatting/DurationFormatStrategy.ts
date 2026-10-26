import type { TFunction } from "i18next";

/** One way to render a duration; a formatter picks the first strategy that supports the value. */
export interface DurationFormatStrategy {
  supports(minutes: number): boolean;
  render(minutes: number, t: TFunction): string;
}
