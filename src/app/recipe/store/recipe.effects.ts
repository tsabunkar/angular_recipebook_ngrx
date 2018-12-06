import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as recipeActions from './recipe.actions';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { Store, select } from '@ngrx/store';
import * as fromRecipeReducer from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {

    url = 'https://ng-recipe-book-4712d.firebaseio.com/recipes.json';
    authUrlWithoutQueryParams = 'https://ng-recipe-book-4712d.firebaseio.com/recipes.json';

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipeReducer.RecipesFeatureLazyModuleState>) { }

    // !below @Effect code is for fetching the recipes from backend server
    // !(replacing getAllRecipe() method from recipe-storage.service.ts to below NgRx Effects)
    @Effect()
    recipeGetAllEffect = this.actions$.pipe(
        ofType(recipeActions.RecipeActionTypes.GETALL_FETCHALL_RECIPES),
        switchMap((action: recipeActions.GetAllFetchAllRecipeAction) => {
            return this.httpClient.get<Recipe[]>(this.url, { observe: 'body', responseType: 'json' });
        }),
        map((responseData) => {
            const recipesArray: Recipe[] = responseData;
            // if (recipesArray !== null) {
                for (const recipeObj of recipesArray) {
                    if (!recipeObj['ingredients']) {
                        recipeObj['ingredients'] = [];
                    }
                }
                console.log('recipeObj from Effects', recipesArray);
                return {
                    type: recipeActions.RecipeActionTypes.SETALL_STOREALL_RECIPES,
                    payload: recipesArray
                };
            // } else {
            //     return {
            //         type: recipeActions.RecipeActionTypes.SETALL_STOREALL_RECIPES,
            //         payload: []
            //     };
            // }
        }),
    );

    // !below @Effect code is to store/POST/PUT the recipes to backend server
    @Effect({ dispatch: false })
    recipePostEffect = this.actions$.pipe(
        ofType(recipeActions.RecipeActionTypes.SETALL_STOREALL_RECIPES),
        withLatestFrom(this.store.pipe(select('recipeSlice'))),
        switchMap(([action, state]) => { // action will have value of -> ofType(recipeActions.RecipeActionTypes.ADD_RECIPE)
            //  state will have value of -> withLatestFrom(this.store.pipe(select('recipeSlice')))


            // const payload: Recipe[] = this.recipeService.getRecipe();
            const payload: Recipe[] = state.recipesArraySliceOfState;
            // const payload: Recipe[] = state.recipesSliceOfState;

            const reqVal = new HttpRequest<Recipe[]>('PUT', this.authUrlWithoutQueryParams, payload,
                {
                    // params: new HttpParams().set('auth', currentTokenValue),
                    reportProgress: true
                });

            return this.httpClient.request(reqVal);
        })
    );

}

