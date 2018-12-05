import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeStorageBackendService } from 'src/app/shared/server-services/recipe-storage.service';
import { AuthService } from 'src/app/auth/auth-service/auth-service.service';
import { Recipe } from 'src/app/recipe/models/recipe.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as authenticationActions from '../../auth/store/auth.actions';



@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {

    authState$: Observable<boolean>;

    constructor(private recipeStorageBackendService: RecipeStorageBackendService,
        // private authService: AuthService,
        private store: Store<fromAuth.AuthState>
    ) { }

    ngOnInit() {
        this.authState$ = this.store.pipe(select('authSlice'));
        // console.log(this.authState$);
    }

    onSaveData() {
        this.recipeStorageBackendService.storeRecipe()
            .subscribe(
                (respData) => {

                },
                (err) => {
                    console.log(err);
                }
            );
    }

    onFetchData() {
        this.recipeStorageBackendService.getAllRecipe()
            .subscribe();
    }

    /*  onLogout() {
         this.authService.logOut();
     } */
    onLogout() {
        this.store.dispatch(new authenticationActions.LogoutAuthAction());
    }

    /*    isUserAuthenticated() { // this is to resolve --aot errors
           return this.authService.isUserAuthenticated();
       }
    */

}
