import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import noData from 'highcharts/modules/no-data-to-display.src';

import { CurrencyChartComponent } from './currency-chart.component';

export function highchartsModules() {
  return [noData];
}

@NgModule({
  declarations: [
    CurrencyChartComponent,
  ],
  imports: [
    CommonModule,
    ChartModule,
  ],
  exports: [
    CurrencyChartComponent,
  ],
  providers: [
    {provide: HIGHCHARTS_MODULES, useFactory: highchartsModules}
  ]
})
export class CurrencyChartModule { }
