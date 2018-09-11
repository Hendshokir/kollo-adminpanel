import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authService = this.injector.get(AuthService);

        if (!authService.isAuthenticated()) {
            return next.handle(req);
            // console.log('AuthInterceptor is auth', authService.isAuthenticated());
        }
        const authReq = req.clone({ headers: req.headers.set('Authorization', authService.getToken()) });
        // console.log(authService.getToken());
        return next.handle(authReq)
            .catch(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        authService.logout();
                    }
                }
                return Observable.throw(error);
            });
    }
}
