import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercept');
    console.log(req.url);

    if (!req.url.includes('/auth/login')) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.accessToken),
      });
      return next.handle(newReq).pipe(
          catchError(err => {
            if (err.status == 401) {
              this.authService.logout()
            }

            return throwError(err.message)
          })
      );
    } else {
      return next.handle(req);
    }
  }
}