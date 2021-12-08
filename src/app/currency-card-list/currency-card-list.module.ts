import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyCardListComponent } from './currency-card-list.component';
import { CurrencyCardModule } from './components/currency-card/currency-card.module';
import { CurrencyCardListRoutingModule } from './currency-card-list-routing.module';


@NgModule({
  declarations: [
    CurrencyCardListComponent,
  ],
  imports: [
    CommonModule,
    CurrencyCardModule,
    CurrencyCardListRoutingModule,
  ],
})
export class CurrencyCardListModule { }
