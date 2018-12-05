import { Action } from '@ngrx/store';
import { Recipe } from '../models/recipe.model';

export enum RecipeActionTypes {
    SET_RECIPES = '[Recipe] set all the recipe',
    ADD_RECIPE = '[Recipe] adding new recipe',
    UPDATE_RECIPE = '[Recipe] update the existing recipe',
    DELETE_RECIPE = '[Recipe] delete a recipe',

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



export type RecipesActions = SetRecipeAction
    | AddRecipeAction
    | UpdateRecipeAction
    | DeleteRecipeAction;


