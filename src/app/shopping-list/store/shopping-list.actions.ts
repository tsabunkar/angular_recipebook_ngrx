import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

// export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export enum ShoppingListActionTypes {
    ADD_INGREDIENT = '[Shopping-list] Add only single Ingredient',
    ADD_INGREDIENTS = '[Shopping-list] Add list of Ingredients',
    UPDATE_INGREDIENT = '[Shopping-list] updating the existing Ingredients',
    DELETE_INGREDIENT = '[Shopping-list] deleting the selected ingredient Ingredients',
    START_EDITING_INGREDIENT = '[Shopping-list] Ingedients item is selected, value is populated in textbox and started editing ingredients',
    STOP_EDITING_INGREDIENT = '[Shopping-list] Editing of ingredient is stopped and can free to navigate any tab',
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
    readonly type = ShoppingListActionTypes.START_EDITING_INGREDIENT;

    constructor(public payload: number) { }
}
export class StopEditIngredientAction implements Action {
    readonly type = ShoppingListActionTypes.STOP_EDITING_INGREDIENT;
}

export type ShoppingListActions = AddIngredientAction
    | AddIngredientsAction
    | UpdateIngredientAction
    | DeleteIngredientAction
    | StartEditIngredientAction
    | StopEditIngredientAction;
