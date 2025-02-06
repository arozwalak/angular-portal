import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() filtersChanged = new EventEmitter<Filters>();

  date!: NgbDateStruct;
  criteria!: string;
  hasAttachment!: string;

  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  onFilterChanged() {
    this.filtersChanged.emit({
      criteria: this.criteria,
      hasAttachment:
        this.hasAttachment === 'true'
          ? true
          : this.hasAttachment === 'false'
          ? false
          : undefined,
      date: this.date,
    });
  }

  dateChanged(date: NgbDateStruct) {
    this.date = date;
    this.onFilterChanged();
  }
}
