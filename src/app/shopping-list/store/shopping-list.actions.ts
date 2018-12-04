import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

// export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export enum ShoppingListActionTypes {
    ADD_INGREDIENT = '[Shopping-list] Add only single Ingredient',
    ADD_INGREDIENTS = '[Shopping-list] Add list of Ingredients',
    UPDATE_INGREDIENT = '[Shopping-list] updating the existing Ingredients',
    DELETE_INGREDIENT = '[Shopping-list] deleting the selected ingredient Ingredients',
}

export class AddIngredientAction implements Action {
    readonly type = ShoppingListActionTypes.ADD_INGREDIENT;
    // payload: Ingredient;
    constructor(public payload: Ingredient) { }
}
export class AddIngredientsAction implements Action {
    readonly type = ShoppingListActionTypes.ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) { }
}
export class UpdateIngredientAction implements Action {
    readonly type = ShoppingListActionTypes.UPDATE_INGREDIENT;

    constructor(public payload: { index: number, newIngredient: Ingredient }) { }
}
export class DeleteIngredientAction implements Action {
    readonly type = ShoppingListActionTypes.DELETE_INGREDIENT;

    constructor(public payload: number) { }
}

export type ShoppingListActions = AddIngredientAction
    | AddIngredientsAction
    | UpdateIngredientAction
    | DeleteIngredientAction;
