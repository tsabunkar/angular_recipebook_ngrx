import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeStorageBackendService } from 'src/app/shared/server-services/recipe-storage.service';
import { AuthService } from 'src/app/auth/auth-service/auth-service.service';
import { Recipe } from 'src/app/recipe/models/recipe.model';


@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    constructor(private recipeStorageBackendService: RecipeStorageBackendService,
        private authService: AuthService
    ) { }

    ngOnInit() { }
    /*     @Output() customeChild_ClickedEvent = new EventEmitter<string>();

        OnClickOfTab(myVara: string) {
            this.customeChild_ClickedEvent.emit(myVara);
        } */

    onSaveData() {
        this.recipeStorageBackendService.storeRecipe()
            .subscribe(
                (respData) => {
                    console.log('---subscriber----');
                    console.log(respData);
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

    onLogout() {
        this.authService.logOut();
    }

    isUserAuthenticated() { // this is to resolve --aot errors
        return this.authService.isUserAuthenticated();
    }


}
