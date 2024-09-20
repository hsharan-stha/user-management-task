import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpInterceptor} from "./interceptor/http.interceptor";
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {UserProfileReducer} from "@/app/store/user-profile/user-profile.reducer";
import {UserProfileEffects} from "@/app/store/user-profile/user-profile.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => new Promise<void>((resolve) => {
        console.log("Initializing application...");
        // Simulate some async work here if necessary
        resolve();
      }),
      multi:true
    },
    provideStore({
      'userProfile':UserProfileReducer
    }),
    provideEffects([
      UserProfileEffects
    ])
]
};
