import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Chart, Options, XAxisOptions } from 'highcharts';

import { DefaultChartSettings } from './default-chart-settings';
import { CurrencyCardService } from '../currency-card.service';
import { IFilterOptionValue } from '../../../../core/models/filter-option/filter-option.interface';


@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.scss']
})
export class CurrencyChartComponent implements OnInit, OnDestroy {

  chart: Chart;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private currencyCardService: CurrencyCardService,
  ) { }

  ngOnInit() {
    this.currencyCardService.formSubmitValue$.pipe(
      takeUntil(this.destroy$),
      switchMap((value: IFilterOptionValue) => this.currencyCardService.getHistoryData(value)),
    ).subscribe((historyData) => {
      this.createChart(historyData);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private createChart(historyData) {
    const settings: Options = {...DefaultChartSettings};
    settings.series = historyData.series;
    const xOptions: XAxisOptions = settings.xAxis as XAxisOptions;
    xOptions.categories = historyData.categories;
    this.chart = new Chart(settings);
  }
}
