import {Routes} from '@angular/router';
import {MainComponent} from "@app/shared/ui-common/main/main.component";
import {isloggedinGuardFn} from "./isloggedin.guard";
import {PageNotFoundComponent} from "@app/shared/ui-common/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [isloggedinGuardFn],
    children: [
      {
        path: '',
        loadComponent: () => import('@app/home/feature-homepage/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'inbox',
        loadComponent: () => import('@app/inbox/feature-inbox-table/inbox.component').then(c => c.InboxComponent),
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('@app/login/feature-login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('@app/signup/feature-signup/signup.component').then(c => c.SignupComponent),
  },
  {
    path: '**',
    component: MainComponent,
    canActivate: [isloggedinGuardFn],
    children: [
      {
        path: '',
        component: PageNotFoundComponent
      }
    ]
  }
];
