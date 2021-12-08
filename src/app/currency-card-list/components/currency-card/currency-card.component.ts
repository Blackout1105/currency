import { Component, Input } from '@angular/core';

import { CurrencyCardService } from './currency-card.service';
import { IFilterOption } from '../../../core/models/filter-option/filter-option.interface';



@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
  providers: [
    CurrencyCardService,
  ]
})
export class CurrencyCardComponent {

  @Input() filterOptions: IFilterOption[];

}
