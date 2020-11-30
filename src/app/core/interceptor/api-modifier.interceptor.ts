import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiModifierIntercrptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //usually I use interceptor u append JWT authentication, but there's no jwt required in est-rouge's assignment so i'll just append the url in every request
    request = request.clone({
      url: environment.apiUrl+request.url
    });
    
    return next.handle(request);
  }
}
