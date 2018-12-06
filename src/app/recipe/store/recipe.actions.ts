import { Action } from '@ngrx/store';
import { Recipe } from '../models/recipe.model';

export enum RecipeActionTypes {
    SET_RECIPES = '[Recipe] set all the recipe',
    ADD_RECIPE = '[Recipe] adding new recipe',
    UPDATE_RECIPE = '[Recipe] update the existing recipe',
    DELETE_RECIPE = '[Recipe] delete a recipe',
    GETALL_FETCHALL_RECIPES = '[Recipe] fetch all/ Get All recipes from backend server to frontend',
    SETALL_STOREALL_RECIPES = '[Recipe] Set all/Store all recipes Array from Frontend to backend'
}

export class SetRecipeAction implements Action {
    readonly type = RecipeActionTypes.SET_RECIPES;

    constructor(public payload: Recipe[]) { }
}
export class AddRecipeAction implements Action {
    readonly type = RecipeActionTypes.ADD_RECIPE;

    constructor(public payload: Recipe) { }
}
export class UpdateRecipeAction implements Action {
    readonly type = RecipeActionTypes.UPDATE_RECIPE;

    constructor(public payload: { indexProp: number, updatedRecipeProp: Recipe }) { }
}
export class DeleteRecipeAction implements Action {
    readonly type = RecipeActionTypes.DELETE_RECIPE;

    constructor(public payload: number) { }
}
export class GetAllFetchAllRecipeAction implements Action {
    readonly type = RecipeActionTypes.GETALL_FETCHALL_RECIPES;
}

export class SetAllStoreAllRecipesAction implements Action {
    readonly type = RecipeActionTypes.SETALL_STOREALL_RECIPES;
}



export type RecipesActions = SetRecipeAction
    | AddRecipeAction
    | UpdateRecipeAction
    | DeleteRecipeAction
    | GetAllFetchAllRecipeAction
    | SetAllStoreAllRecipesAction;


