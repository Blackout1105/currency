import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataLabelComponent } from './data-label.component';


@NgModule({
  declarations: [
    DataLabelComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DataLabelComponent,
  ]
})
export class DataLabelModule { }
