import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()

export class UsersService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // get all users
  getUsers() {
    return this.http.get(environment.apiPath + 'admin/all-users')
    .pipe(map(
      (response: Response) => {
        const data = response;
        console.log(data);
        return data;
      },
      (error) => console.log(error)
    ));
  }

  // get one user
  userDetails(id) {
    return this.http.get(environment.apiPath + 'admin/one-user/' + id)
    .pipe(map(
      (response: Response) => {
        // console.log(environment.apiPath + 'admin/one-user' + id);
        const data = response;
        return data;
      },
      (error) => console.log(error)
    ));
  }

  // get one user offer-orders
  userOfferOrders(id) {
    return this.http.get(environment.apiPath + 'users/' + id + '/offer-orders')
    .pipe(map(
      (response: Response) => {
        // console.log(environment.apiPath + 'admin/one-user' + id);
        const data = response;
        console.log(response);
        return data;
      },
      (error) => console.log(error)
    ));
  }

  // get one user orders
  userOrders(id) {
    return this.http.get(environment.apiPath + 'users/' + id + '/products-orders')
    .pipe(map(
      (response: Response) => {
        const data = response;
        console.log(response);
        return data;
      },
      (error) => console.log(error)
    ));
  }

   // get users count
   getUsersCount() {
    return this.http.get(environment.apiPath + 'admin/number-of-users')
    .pipe(map(
      (response: Response) => {
        const data = response;
        // console.log(data);
        return data;
      },
      (error) => console.log(error)
    ));
  }

  updateUserPoints(user) {
    return this.http.put(environment.apiPath + 'admin/points/' + user._id, user)
    .pipe(map(
      (response: Response) => {
        const data = response;
        console.log('points updated');
        return data;
      },
      (error) => console.log(error)
    ));
  }
}
