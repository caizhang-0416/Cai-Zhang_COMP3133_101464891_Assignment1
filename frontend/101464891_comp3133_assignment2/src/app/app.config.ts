import {ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import {provideApollo} from "apollo-angular";
import {InMemoryCache} from "@apollo/client/core";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import {provideNativeDateAdapter} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(), // Required for HttpLink
    provideApollo(()=> {
      return {
        link: createUploadLink({ uri: '/graphql' }),
        cache: new InMemoryCache(),
      };
    }),
    provideNativeDateAdapter(),
  ]
};
