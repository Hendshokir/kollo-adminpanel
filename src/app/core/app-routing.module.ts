import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { HomeContentComponent } from './modules/home-content/home-content.component';

import { UsersComponent } from './modules/users/users.component';
import { UserDetailsComponent } from './modules/user-details/user-details.component';
import { CategoryComponent } from './modules/category/category.component';
import { ShopsComponent } from './modules/shops/shops.component';

import { OffersComponent } from './modules/offers/offers.component';
import { OffersDetailsComponent } from './modules/offers-details/offers-details.component';

import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

import { AuthGuard } from './services/auth.gaurd.service';
import { ShopDetailsComponent } from './modules/shop-details/shop-details.component';
import { OrdersComponent } from './modules/orders/orders.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeContentComponent},
      {path: 'users', component: UsersComponent},
      {path: 'users/:id', component: UserDetailsComponent},
      {path: 'shops', component: CategoryComponent},
      {path: 'shops/:id', component: ShopsComponent},
      {path: 'shop/:id', component: ShopDetailsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'offers', component: OffersComponent},
      {path: 'offers/:id', component: OffersDetailsComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  // {path: 'not-found', component: PageNotFoundComponent},
  // {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ]
})

export class AppRoutingModule {

}
