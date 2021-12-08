import * as moment from 'moment';

export class FormatValue {

  public static formatDate(date: string, dateFormat?: string): string {
    const format: string = dateFormat ? dateFormat : 'MM/DD/YY';
    return moment(date).format(format);
  }

  public static formatNumber(num: number): number {
    return Math.round(num * 100) / 100;
  }
}
