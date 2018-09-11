import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    currentUser;
    constructor(private http: HttpClient, private router: Router) { }

    login(user) {
      return this.http.post(environment.apiPath + 'login', user);
    }

    setUser(Data) {
      this.currentUser = Data;
      localStorage.setItem('@MYUSER', JSON.stringify(this.currentUser));
      console.log(this.currentUser);
    }

    checkUser() {
        const user = localStorage.getItem('@MYUSER');

        if (user) {
          this.currentUser = JSON.parse(user);
        } else {
          return false;
        }
    }

    isAuthenticated(): boolean {
      if (this.checkUser() === false) {
        console.log('is auth', this.checkUser());
        return false;
      } else {
       return true;
      }
  }

    getToken() {
      return 'Bearer ' + this.currentUser.token;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('@MYUSER');
        this.router.navigate(['login']);
    }

}
