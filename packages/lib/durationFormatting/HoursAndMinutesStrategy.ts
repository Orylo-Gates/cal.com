import type { TFunction } from "i18next";

import { MINUTES_IN_HOUR } from "../convertToNewDurationType";
import type { DurationFormatStrategy } from "./DurationFormatStrategy";

export class HoursAndMinutesStrategy implements DurationFormatStrategy {
  supports(minutes: number): boolean {
    return Number.isFinite(minutes) && minutes >= 0;
  }

  render(minutes: number, t: TFunction): string {
    const hours = Math.floor(minutes / MINUTES_IN_HOUR);
    const rest = minutes % MINUTES_IN_HOUR;
    if (hours === 0) return t("minute_timeUnit", { count: rest });
    if (rest === 0) return t("hour_timeUnit", { count: hours });
    return `${t("hour_timeUnit", { count: hours })} ${t("minute_timeUnit", { count: rest })}`;
  }
}
