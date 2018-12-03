import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                event => {
                    console.log('logging interceptor response', event);
                }
            )
        );
    }
}
/* // ! for above code we get console.log as ->
logging interceptor response {type: 0} // ! sent event(which tells request is send to server we r waiting for the response - type=0)
logging.interceptor.ts:12 logging interceptor response HttpResponse
{headers: HttpHeaders, status: 200, statusText: "OK", url: "https://ng-recipe-book-4712d.firebaseio.com/recipqHQ", ok: true, …} //! Response
 */
