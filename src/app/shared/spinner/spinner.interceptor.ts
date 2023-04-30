import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService:SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const modifiedRequest = request.clone({
      headers: request.headers.set('x-nameidentifier', localStorage.getItem('x-nameidentifier')||'')
    });
    if(!modifiedRequest.url.includes('Tokenrefresh'))
      this.spinnerService.show();
    return next.handle(modifiedRequest).pipe(finalize(()=>this.spinnerService.hide()));
  }
}
