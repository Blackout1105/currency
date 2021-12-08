import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardGeneralDataComponent } from './card-general-data.component';


@NgModule({
  declarations: [
    CardGeneralDataComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardGeneralDataComponent,
  ]
})
export class CardGeneralDataModule { }
