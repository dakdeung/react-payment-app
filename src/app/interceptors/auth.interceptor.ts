import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // constructor(private auth: UserService) {}

  // intercept(request: HttpRequest<any>, next: HttpHandler) {
  //   // Ambil data dari AuthService
  //   const authToken = this.auth.getAuthorizationToken()

  //   // Clone request, lalu isi Authorization sebagai salah satu HTTP Header
  //   request = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })

  //   return next.handle(request);
  // }
  constructor(private auth: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getAuthorizationToken()
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    return next.handle(req);
  }
}
