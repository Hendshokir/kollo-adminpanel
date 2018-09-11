import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/finally';

@Injectable()

export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {}
    // get all orders
    getOrders() {
      return this.http.get(environment.apiPath + 'admin/products-orders')
      .pipe(map(
        (response: Response) => {
          const data = response;
          console.log(data);
          return data;
        },
        (error) => console.log(error)
      ));
    }
}
