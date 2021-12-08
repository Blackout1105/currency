import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyOptionsResolver } from './core/resolvers/currency-options.resolver';

const routes: Routes = [
  {
    path: 'currency-card-list',
    resolve: {
      options: CurrencyOptionsResolver
    },
    loadChildren: () => import('./currency-card-list/currency-card-list.module').then((m) => m.CurrencyCardListModule)
  },
  {path: '**', redirectTo: '/currency-card-list'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
