import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyCardComponent } from './currency-card.component';
import { CurrencyFilterModule } from './currency-filter/currency-filter.module';
import { DataLabelModule } from '../../../shared/data-label/data-label.module';
import { CardGeneralDataModule } from './card-general-data/card-general-data.module';
import { CurrencyChartModule } from './currency-chart/currency-chart.module';


@NgModule({
  declarations: [
    CurrencyCardComponent,
  ],
  imports: [
    CommonModule,

    CurrencyFilterModule,
    DataLabelModule,
    CardGeneralDataModule,
    CurrencyChartModule,
  ],
  exports: [
    CurrencyCardComponent,
  ],
})
export class CurrencyCardModule { }
