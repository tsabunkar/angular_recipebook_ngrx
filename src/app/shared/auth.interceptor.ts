import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service/auth-service.service';
import { Store, select } from '@ngrx/store';
import { map, switchMap, take } from 'rxjs/operators';

import * as fromAppReducer from '../store/app.reducers';
import * as fromAuthReducer from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        // private authService: AuthService,
        private store: Store<fromAppReducer.AppState>
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.store.pipe(
            select('authSlice'),
            take(1), // take returns an Observable that emits only the first count values emitted by the source Observable
            switchMap((authState: fromAuthReducer.AuthState) => {
                console.log('authState.tokenSliceOfState', authState.tokenSliceOfState);
                const copiedReq = req.clone({
                    params: req.params.set('auth', authState.tokenSliceOfState) // !set the queryParams
                });
                return next.handle(copiedReq); // allow the request to continue its journey
            })
        );
    }
}

// Note: bydefault this request are immutable.
// Above example is to show intercepting Requests
