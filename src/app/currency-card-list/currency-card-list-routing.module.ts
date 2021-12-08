import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CurrencyCardListComponent } from './currency-card-list.component';


const routes: Routes = [
  {path: '', component: CurrencyCardListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class CurrencyCardListRoutingModule {

}
