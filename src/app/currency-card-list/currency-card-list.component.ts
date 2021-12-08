import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';

import { IFilterOption } from '../core/models/filter-option/filter-option.interface';


@Component({
  selector: 'app-currency-card-list',
  templateUrl: './currency-card-list.component.html',
  styleUrls: ['./currency-card-list.component.scss']
})
export class CurrencyCardListComponent implements OnInit {

  filterOptions: IFilterOption[];


  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.data.pipe(
      take(1),
    ).subscribe(data => {
      this.filterOptions = data.options;
    });
  }

}
