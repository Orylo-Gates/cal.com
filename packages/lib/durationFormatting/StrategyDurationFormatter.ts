import type { TFunction } from "i18next";

import type { DurationFormatStrategy } from "./DurationFormatStrategy";
import type { DurationFormatter } from "./DurationFormatter";

export class StrategyDurationFormatter implements DurationFormatter {
  constructor(private readonly strategies: DurationFormatStrategy[]) {}

  format(minutes: number, t: TFunction): string {
    const strategy = this.strategies.find((candidate) => candidate.supports(minutes));
    if (!strategy) {
      throw new Error(`No duration strategy supports ${minutes}`);
    }
    return strategy.render(minutes, t);
  }
}
