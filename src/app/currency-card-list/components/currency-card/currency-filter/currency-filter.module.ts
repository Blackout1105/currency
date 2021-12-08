import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyFilterComponent } from './currency-filter.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CurrencyFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CurrencyFilterComponent,
  ]
})
export class CurrencyFilterModule { }
