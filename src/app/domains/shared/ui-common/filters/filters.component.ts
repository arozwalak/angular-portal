import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filters',
  imports: [NgbDatepickerModule, FormsModule, JsonPipe],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  model!: NgbDateStruct;
  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = true;
  outsideDays = 'visible';
}
