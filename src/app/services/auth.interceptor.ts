import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = window.localStorage.getItem('token') || '';

    const authReq = req.clone({
      setHeaders: {
        // @ts-ignore
        'Authorization': token
      }
    });

    return next.handle(authReq);
  }
}
