import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AddAlert } from '../actions/Alert.actions';
import { SetIsUiLoading } from '../actions/Ui.action';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('this is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    }
                    else {
                        console.log('this is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    this.store.dispatch(new SetIsUiLoading(false));
                    this.store.dispatch(new AddAlert({ Message: errorMsg, Title: "Error", Route: "" }));

                    return throwError(errorMsg);
                })
            )
    }
}