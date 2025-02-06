import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(NgbModule)],
};
