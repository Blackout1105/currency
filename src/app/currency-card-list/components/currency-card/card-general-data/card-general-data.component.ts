import { Component, OnDestroy, OnInit } from '@angular/core';

import { merge, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { CurrencyCardService } from '../currency-card.service';
import { IGeneralDataItem } from '../../../../core/models/general-data-item/general-data-item.interface';
import { IFilterOptionValue } from '../../../../core/models/filter-option/filter-option.interface';


@Component({
  selector: 'app-card-general-data',
  templateUrl: './card-general-data.component.html',
  styleUrls: ['./card-general-data.component.scss']
})
export class CardGeneralDataComponent implements OnInit, OnDestroy {

  items$: Observable<IGeneralDataItem[]> = new Observable<IGeneralDataItem[]>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private currencyCardService: CurrencyCardService
  ) {
  }

  ngOnInit() {
    this.items$ = this.currencyCardService.formSubmitValue$.pipe(
      takeUntil(this.destroy$),
      switchMap((value: IFilterOptionValue) => merge(
        this.currencyCardService.getExrateData(value),
        this.currencyCardService.getExrateLiveData(value))
      ),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.currencyCardService.closeWsExrateDataConnection();
  }

}
