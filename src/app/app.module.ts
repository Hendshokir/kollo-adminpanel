import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './core/app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';

import { LoginComponent } from './core/modules/login/login.component';

import { DashboardComponent } from './core/modules/dashboard/dashboard.component';

import { HomeComponent } from './core/modules/home/home.component';
import { HomeContentComponent } from './core/modules/home-content/home-content.component';

import { UsersComponent } from './core/modules/users/users.component';
import { UserDetailsComponent } from './core/modules/user-details/user-details.component';

import { OffersComponent } from './core/modules/offers/offers.component';
import { OffersDetailsComponent } from './core/modules/offers-details/offers-details.component';

import { PageNotFoundComponent } from './core/modules/page-not-found/page-not-found.component';

import { AuthService } from './core/services/auth.service';
import { AuthInterceptor } from './core/services/auth.interceptor.service';
import { AuthGuard } from './core/services/auth.gaurd.service';

import { UsersService } from './core/services/users.service';
import { OffersService } from './core/services/offers.service';
import { ShopsService } from './core/services/shops.service';

import { OrderService} from './core/services/order.service';
import { ShopsComponent } from './core/modules/shops/shops.component';
import { CategoryComponent } from './core/modules/category/category.component';
import { ShopDetailsComponent } from './core/modules/shop-details/shop-details.component';
import { ProductsService } from './core/services/products.service';
import { OrdersComponent } from './core/modules/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    UsersComponent,
    UserDetailsComponent,
    HomeContentComponent,
    OffersComponent,
    OffersDetailsComponent,
    ShopsComponent,
    CategoryComponent,
    ShopDetailsComponent,
    OrdersComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    UsersService,
    OffersService,
    ProductsService,
    ShopsService,
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
