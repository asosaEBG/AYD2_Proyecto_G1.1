import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAuth } from './auth/auth.provider';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAuth()]
};
