import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProducts(marketId) {
    return this.http.get(environment.apiPath + 'markets/' + marketId + '/products')
      .pipe(map(
        (response: Response) => response,
        (error) => console.log(error)
      ));
  }

  addProduct(product, imgs, marketId) {
    const formData = new FormData();

    if (imgs && imgs.length > 0) {
      formData.append('imgs', imgs[0], imgs[0]['name']);
    }

    Object.keys(product).forEach(key => {
      if (product[key]) {
        formData.append(key, product[key]);
        console.log(product[key]);
      }
    });

    // formData.append('avaliablesizes', product.avaliablesizes);
    return this.http.post(environment.apiPath + 'markets/' + marketId + '/products', formData)
      .pipe(map(
        (response: Response) => response,
        (error) => console.log(error)
      ));
  }

  editProduct(product, imgs, marketId) {
    const formData = new FormData();

    if (imgs && imgs.length > 0) {
      formData.append('imgs', imgs[0], imgs[0]['name']);
    }

    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('avaliablesizes', product.avaliablesizes);
    formData.append('avaliablecolor', product.avaliablecolor);
    formData.append('desc', product.desc);

    return this.http.put(environment.apiPath + 'markets/' + marketId + '/products/' + product._id, formData)
      .pipe(map(
        (response: Response) => response,
        (error) => console.log(error)
      ));
  }
}
