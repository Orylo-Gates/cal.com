import type { DurationFormatter } from "./DurationFormatter";
import { HoursAndMinutesStrategy } from "./HoursAndMinutesStrategy";
import { StrategyDurationFormatter } from "./StrategyDurationFormatter";

export class DurationFormatterFactory {
  static create(): DurationFormatter {
    return new StrategyDurationFormatter([new HoursAndMinutesStrategy()]);
  }
}
