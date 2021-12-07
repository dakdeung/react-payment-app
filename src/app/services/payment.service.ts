import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  endpoint: string = 'https://final-project-1-riyan.herokuapp.com';

  constructor(private http: HttpClient) { }

  // ambil pseudo-setter dan pseudo-getter untuk app_token

  getPayment () {
    const api = `${this.endpoint}/api/Bank`

    return this.http.get(api)
    .pipe( catchError(this.handleError) )
  }

  //POST
  postPayment(payment: Payment):  Observable<any> {
    let api = `${this.endpoint}/api/Bank`;
    return this.http
      .post(api, payment)
      .pipe(catchError(this.handleError));
  }

  // PUT
  putPayment(id: Number, payment: Payment): Observable<any> {
    let api = `${this.endpoint}/api/Bank/${id}`;
    return this.http
      .put(api, payment)
      .pipe(catchError(this.handleError));
  }

  deletePayment (id:number) : Observable<any> {
    let api = `${this.endpoint}/api/Bank/${id}`;

    return this.http.delete(api)
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
