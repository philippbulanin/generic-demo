import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {ProductsTableComponent} from './components/products-table/products-table.component';
import {SimpleTableComponent} from './components/simple-table/simple-table.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import { TableHeaderComponent } from './components/simple-table/table-header/table-header.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    ProductsTableComponent,
    SimpleTableComponent,
    TableHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
