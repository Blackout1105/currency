import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';

import { CurrencyCardService } from '../currency-card.service';
import { IFilterOption, IFilterOptionValue } from '../../../../core/models/filter-option/filter-option.interface';


@Component({
  selector: 'app-currency-filter',
  templateUrl: './currency-filter.component.html',
  styleUrls: ['./currency-filter.component.scss']
})
export class CurrencyFilterComponent implements OnInit, OnDestroy {

  @Input() options: IFilterOption[];

  form: FormGroup;
  canSubmit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private searchValue$: BehaviorSubject<IFilterOptionValue> = new BehaviorSubject<IFilterOptionValue>(null);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  get currencySelectControl() {
    return this.form.get('currencySelect');
  }

  constructor(
    private currencyCardService: CurrencyCardService,
    ) {
  }

  ngOnInit(): void {
    this.form = this.currencyCardService.form;

    this.currencySelectControl.valueChanges.pipe(
      withLatestFrom(this.searchValue$),
      takeUntil(this.destroy$),
    ).subscribe(([controlValue, previousValue]: [string, IFilterOptionValue]) => {
      const isEqual: boolean = controlValue === (previousValue && previousValue.optionId);
      this.canSubmit$.next(isEqual);
    });

    this.searchValue$.pipe(
      takeUntil(this.destroy$),
      filter((value: IFilterOptionValue) => !!value),
    ).subscribe((value: IFilterOptionValue) => {
      this.currencyCardService.formSubmitValue$.next(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private onFormSubmit(): void {
    if (this.form.valid) {
      const selected: IFilterOption = this.options
        .find((option: IFilterOption) => option.value.optionId === this.currencySelectControl.value);
      this.searchValue$.next(selected.value);
      this.canSubmit$.next(true);
    }
  }
}
