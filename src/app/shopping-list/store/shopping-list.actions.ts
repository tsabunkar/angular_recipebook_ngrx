import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

// export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export enum ShoppingListActionTypes {
    ADD_INGREDIENT = '[Shopping-list] List of all elements in the shopping list'
}

export class AddIngredientAction implements Action {
    readonly type = ShoppingListActionTypes.ADD_INGREDIENT;
    // payload: Ingredient;
    constructor(public payload: Ingredient) { }
}

export type ShoppingListActions = AddIngredientAction;
