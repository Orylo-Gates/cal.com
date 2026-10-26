import type { TFunction } from "i18next";

/** Turns a length in minutes into the label calendar descriptions show. */
export interface DurationFormatter {
  format(minutes: number, t: TFunction): string;
}
