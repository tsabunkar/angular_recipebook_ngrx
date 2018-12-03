import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('auth intercepting requests', req);
        const copiedReq = req.clone({
            // headers: req.headers.set('', ''), // !set the headers
            params: req.params.set('auth', this.authService.getToken()) // !set the queryParams
        }); // we gets the excat & latest copy of incoming request,
        // this makes sure we dont change the incoming request multiple times

        return next.handle(copiedReq); // allow the request to continue its journey
    }
}

// Note: bydefault this request are immutable.
// Above example is to show intercepting Requests
