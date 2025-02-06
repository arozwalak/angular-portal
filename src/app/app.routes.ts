import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/home.component';
import { InboxComponent } from './domains/inbox/feature-inbox-table/inbox.component';
import {MainComponent} from "./domains/shared/ui-common/main/main.component";
import {SignupComponent} from "./domains/signup/signup.component";
import {LoginComponent} from "./domains/login/feature-login/login.component";
import {isloggedinGuardFn} from "./isloggedin.guard";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [isloggedinGuardFn],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'inbox',
        component: InboxComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
