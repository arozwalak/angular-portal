import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/home.component';
import { InboxComponent } from './domains/inbox/feature-inbox-table/inbox.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'inbox',
    component: InboxComponent,
  },
];
