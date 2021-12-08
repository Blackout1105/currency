import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {  EMPTY, Observable, Subject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { ApiConfig } from '../../../core/api-config';
import { environment } from '../../../../environments/environment';
import { IFilterOptionValue } from '../../../core/models/filter-option/filter-option.interface';
import { FormatValue } from '../../../core/helpers/format-value';
import { IExrateDataItemApi } from '../../../core/models/exrate/exrate-data-item-api.interface';
import { IGeneralDataItem } from '../../../core/models/general-data-item/general-data-item.interface';
import { ISeriesApi } from '../../../core/models/series/series-api.interface';
import { IChartSeries, IChartSeriesData, ISeriesConfig } from '../../../core/models/series/series-chart-data.interface';
import { ChartSeriesConfig } from '../../../core/configs/chart-series-config';


interface IParams {[param: string]: string | string[]; }

@Injectable()
export class CurrencyCardService {

  form: FormGroup;
  formSubmitValue$: Subject<IFilterOptionValue> = new Subject<IFilterOptionValue>();
  private liveData$: WebSocketSubject<any>;

  constructor(
    private http: HttpClient,
  ) {
    this.initForm();
  }

  getHistoryData(value: IFilterOptionValue): Observable<IChartSeriesData> {
    const params: IParams = {
      apiKey: environment.apiKey,
      period_id: '1DAY',
      time_start: value.dateStart,
    };
    return this.http.get(ApiConfig.exrateHistoryPath(value.ids), {params}).pipe(
      catchError(() => EMPTY),
      map((data: ISeriesApi[]) => {
        return !Array.isArray(data) ? ({} as IChartSeriesData) : {
          categories: data.map(item => FormatValue.formatDate(item.time_close)),
          series: this.getChartSeries(data),
        };
      })
    );
  }

  getExrateData(value: IFilterOptionValue): Observable<IGeneralDataItem[]> {
    const params: IParams = {
      apiKey: environment.apiKey,
      asset_id_base: value.ids[0],
      asset_id_quote: value.ids[1],
    };
    return this.http.get(ApiConfig.exratePath(value.ids), {params}).pipe(
      catchError(() => EMPTY),
      map((item: IExrateDataItemApi) => this.prepareGeneralData(item))
    );
  }

  getExrateLiveData(value: IFilterOptionValue): Observable<IGeneralDataItem[]> {
    return this.openWsExrateData(value.ids).asObservable().pipe(
      filter((item: IExrateDataItemApi) => this.checkProperExrateValues(item, value.ids)),
      map((item: IExrateDataItemApi) => this.prepareGeneralData(item))
    );
  }


  closeWsExrateDataConnection(): void {
    if (this.liveData$) {
      this.liveData$.complete();
    }
  }

  private openWsExrateData(ids: string[]): WebSocketSubject<IExrateDataItemApi> {
    this.closeWsExrateDataConnection();
    this.liveData$ = webSocket(environment.apiWsPath);
    const message = {
      type: 'hello',
      apikey: environment.apiKey,
      heartbeat: false,
      subscribe_data_type: ['exrate'],
      subscribe_filter_asset_id: ids
    };
    this.liveData$.next(message);
    return this.liveData$;
  }

  private checkProperExrateValues(item: IExrateDataItemApi, ids: string[]): boolean {
    return item.type === 'exrate' && item.asset_id_base === ids[0] && item.asset_id_quote === ids[1];
  }

  private prepareGeneralData(item: IExrateDataItemApi): IGeneralDataItem[] {
    const symbol: IGeneralDataItem = {label: 'Symbol', value: item.asset_id_base + ' / ' + item.asset_id_quote};
    const price: IGeneralDataItem = {label: 'Price', value: FormatValue.formatNumber(item.rate)};
    const time: IGeneralDataItem = {label: 'Time', value: FormatValue.formatDate(item.time, 'MM/DD/YY, h:mm:ss a')};
    return [symbol, price, time];
  }

  private getChartSeries(data: ISeriesApi[]): IChartSeries[] {
    const config: ISeriesConfig[] = ChartSeriesConfig.getSeriesOptions();
    return config.map((configItem: ISeriesConfig): IChartSeries => ({
      name: configItem.name,
      data: data.map(item => FormatValue.formatNumber(item[configItem.source])),
    }));
  }

  private initForm(): void {
    this.form = new FormGroup({
      currencySelect: new FormControl(null, Validators.required),
    });
  }
}



