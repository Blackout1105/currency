import { SeriesRateTypesEnum } from '../models/series/series-rate-types.enum';
import { ISeriesConfig } from '../models/series/series-chart-data.interface';

const SeriesConfig: ISeriesConfig[] = [
  {name: 'Opened', source: SeriesRateTypesEnum.open},
  {name: 'Max', source: SeriesRateTypesEnum.high},
  {name: 'Min', source: SeriesRateTypesEnum.low},
  {name: 'Closed', source: SeriesRateTypesEnum.close},
];

export class ChartSeriesConfig {
  public static getSeriesOptions(): ISeriesConfig[] {
    return SeriesConfig;
  }
}
