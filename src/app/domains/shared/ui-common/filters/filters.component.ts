import {Component, EventEmitter, input, model, output, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Filters } from './Filters';

@Component({
  selector: 'app-filters',
  imports: [NgbDatepickerModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  query = model<string>('');
  hasAttachment = model<boolean>();
  order = model<'asc' | 'desc'>('asc');
  date = model<NgbDateStruct>();

  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
}
