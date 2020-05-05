import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStoreService } from './services/auth-store.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authStoreService: AuthStoreService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authStoreService.getAuthToken()}`
      }
    });
    return next.handle(request);
  }
}