import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'https://final-project-1-riyan.herokuapp.com';

  constructor(private http: HttpClient) { }

  get isAuthenticated() {
    // double-bang (!!) akan mengembalikan nilai truthy/falsy
    // dari sebuah value, beda dari negation (!) yang mengembalikan
    // nilai kebalikannya.
    return !!this.getAuthorizationToken()
  }

  // ambil pseudo-setter dan pseudo-getter untuk app_token

  getAuthorizationToken () {
    return localStorage.getItem('app_token')
  }

  setAuthorizationToken (token: string) {
    return localStorage.setItem('app_token', token)
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('app_token');
    return (authToken !== null) ? true : false;
  }

  signUp(user: User): Observable<any>{
    const api = `${this.endpoint}/api/AuthManagement/Register`;

    return this.http
    .post(api, user)
    .pipe( catchError(this.handleError) )
  }

  signIn(user: User) {
    const api = `${this.endpoint}/api/AuthManagement/Login`;

    return this.http
    .post(api, user)
    .pipe( catchError(this.handleError) )
  }

  handleError(error: HttpErrorResponse){
    // if(error.error instanceof ErrorEvent){
    //   return throwError(error.error.message)
    // } else {
    //   return throwError(`Server-side error code: ${error.status}\nMessage: ${error.message}`)
    // }
    let msg = '';
    if(error.error instanceof ErrorEvent){
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
