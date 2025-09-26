import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';

import { ordersReducer } from './app/store/orders.reducer';
import { OrdersEffects } from './app/store/order.effects';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideStore({ orders: ordersReducer }),
    provideEffects([OrdersEffects]),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
