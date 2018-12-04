import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

// export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export enum ShoppingListActionTypes {
    ADD_INGREDIENT = '[Shopping-list] Add only single Ingredient',
    ADD_INGREDIENTS = '[Shopping-list] Add list of Ingredients',
    UPDATE_INGREDIENT = '[Shopping-list] updating the existing Ingredients',
    DELETE_INGREDIENT = '[Shopping-list] deleting the selected ingredient Ingredients',
    START_EDIT = '[Shopping-list] started editing ingredients',
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

    constructor(public payload: { newIngredient: Ingredient }) { }
}
export class DeleteIngredientAction implements Action {
    readonly type = ShoppingListActionTypes.DELETE_INGREDIENT;

    constructor() { }
}
export class StartEditIngredientAction implements Action {
    readonly type = ShoppingListActionTypes.START_EDIT;

    constructor(public payload: number) { }
}

export type ShoppingListActions = AddIngredientAction
    | AddIngredientsAction
    | UpdateIngredientAction
    | DeleteIngredientAction
    | StartEditIngredientAction;
