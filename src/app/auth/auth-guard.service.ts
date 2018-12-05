import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service/auth-service.service';
import { Store, select } from '@ngrx/store';

import { map } from 'rxjs/operators';

import * as fromAppReducer from '../store/app.reducers';
import * as fromAuthReducer from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private store: Store<fromAppReducer.AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.authService.isUserAuthenticated();
        return this.store.pipe(
            select('authSlice'),
            map((authState: fromAuthReducer.AuthState) => {
                return authState.isAuthenticatedSliceOfState;
            })
        );
    }

    // this gaurd is used to protect / does not allow unauthorized user to create or edit a recipe
}
