import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-data-label',
  templateUrl: './data-label.component.html',
  styleUrls: ['./data-label.component.scss']
})
export class DataLabelComponent {
  @Input() label: string;
}
