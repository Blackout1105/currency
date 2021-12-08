import { SeriesRateTypesEnum } from './series-rate-types.enum';

export interface IChartSeriesData {
  categories: string[];
  series: IChartSeries[];
}

export interface IChartSeries {
  name: string;
  data: number[];
}

export interface ISeriesConfig {
  name: string;
  source: SeriesRateTypesEnum;
}
