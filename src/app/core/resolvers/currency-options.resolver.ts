import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CurrencyCardListService } from '../services/currency-card-list.service';
import { IFilterOption } from '../models/filter-option/filter-option.interface';


@Injectable({
  providedIn: 'root'
})
export class CurrencyOptionsResolver implements Resolve<any> {

  constructor(
    private currencyCardListService: CurrencyCardListService
  ) { }

  resolve(): Observable<IFilterOption[]> {
    return this.currencyCardListService.getFilterOptions().pipe(
      filter(res => !!res),
      take(1),
    );
  }
}
