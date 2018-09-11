import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ShopsService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  // get all categories
  getCategories() {
    return this.http.get(environment.apiPath + 'category')
      .pipe(map(
        (response: Response) => {
          const data = response;
          // console.log(data);
          return data;
        },
        (error) => console.log(error)
      ));
  }

  // get all shops
  getShops(id) {
    return this.http.get(environment.apiPath + 'category/' + id + '/shopping-markets')
      .pipe(map(
        (response: Response) => {
          const data = response;
          console.log(data);
          return data;
        },
        (error) => console.log(error)
      ));
  }

  // update shop
  updateShop(shop, catId, logo, cover) {
    const _formData = new FormData();

    if (logo && logo.length > 0) {
      _formData.append('logo', logo[0], logo[0]['name']);
    }

    if (cover && cover.length > 0) {
      _formData.append('cover', cover[0], cover[0]['name']);
    }

    _formData.append('logo', shop.logo);
    _formData.append('genderTarget', shop.genderTarget);
    _formData.append('name', shop.name);
    _formData.append('categoryId', catId);
    console.log(_formData);

    return this.http.put(environment.apiPath + 'category/' + catId + '/shopping-markets/' + shop._id, _formData)
      .pipe(map(
        (response: Response) => {
          const data = response;
          console.log('shop updates');
          return data;
        },
        (error) => console.log(error)
      ));
  }

  // add one offer
  addShop(shop, catId, logo, cover) {
    const _formData = new FormData();

    _formData.append('logo', shop.logo);
    if (shop.genderTarget) {
      _formData.append('genderTarget', shop.genderTarget);
    }

    _formData.append('name', shop.name);
    _formData.append('categoryId', catId);

    if (logo && logo.length > 0) {
      _formData.append('logo', logo[0], logo[0]['name']);
    }

    if (cover && cover.length > 0) {
      _formData.append('cover', cover[0], cover[0]['name']);
    }

    console.log(_formData);
    return this.http.post(environment.apiPath + 'category/' + catId + '/shopping-markets', _formData)
      .pipe(map(
        (response: Response) => {
          const data = response;
          console.log('formdata response' + response);
          return data;
        },
        (error) => console.log(error)
      ));
  }

  // get shops count
  getShopsCount(id) {
    return this.http.get(environment.apiPath + 'category/' + id + '/shopping-markets-counts')
      .pipe(map(
        (response: Response) => {
          const data = response;
          // console.log(data);
          return data;
        },
        (error) => console.log(error)
      ));
  }
  // get products count
  getProductsCount() {
    return this.http.get(environment.apiPath + 'admin/number-of-all-products')
      .pipe(map(
        (response: Response) => {
          const data = response;
          // console.log(data);
          return data;
        },
        (error) => console.log(error)
      ));
  }

  // get order-offers count
  getOrderOffersCount() {
    return this.http.get(environment.apiPath + 'number-of-all-order-offers/count')
      .pipe(map(
        (response: Response) => {
          const data = response;
          // console.log(data);
          return data;
        },
        (error) => console.log(error)
      ));
  }

  // get order-product count
  getOrderProductCount() {
    return this.http.get(environment.apiPath + 'number-of-all-order-offers/count')
      .pipe(map(
        (response: Response) => {
          const data = response;
          // console.log(data);
          return data;
        },
        (error) => console.log(error)
      ));
  }

  // get order-Statistic count
  getOrderStatisticCount() {
    return this.http.get(environment.apiPath + 'admin/statictics')
      .pipe(map(
        (response: Response) => {
          const data = response;
          // console.log(data);
          return data;
        },
        (error) => console.log(error)
      ));
  }

  // get one user
  categoryDetails(id) {
    return this.http.get(environment.apiPath + 'category/' + id)
      .pipe(map(
        (response: Response) => {

          const data = response;
          return data;
        },
        (error) => console.log(error)
      ));
  }
}
