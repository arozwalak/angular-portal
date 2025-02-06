import { Component } from '@angular/core';
import { FiltersComponent } from '../shared/ui-common/filters/filters.component';

@Component({
  selector: 'app-inbox',
  imports: [FiltersComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent {}
