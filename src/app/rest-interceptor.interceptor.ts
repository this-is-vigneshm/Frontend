import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class RestInterceptorInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = 'Vanakkam';
    console.log('Inside Http Interceptor', token);
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', accessToken),
      });
      console.log('Token added to HTTP request', accessToken);

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
    // return next.handle(request.clone({ headers : {  token } }));
  }
}
