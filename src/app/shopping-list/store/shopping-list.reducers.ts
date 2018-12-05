import { ActionReducer, Action } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredient.model';
import * as shoppingListActions from './shopping-list.actions';


export interface ApplicationState {
    shoppingListSliceOfState: ShoppingListState;
}
export interface ShoppingListState {
    ingredientsArraySliceOfState: Ingredient[];
    editedIngredientSliceOfState: Ingredient;
    editedIngredientIndexSliceOfState: number;
}

const initalState: ShoppingListState = {
    ingredientsArraySliceOfState: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredientSliceOfState: null,
    editedIngredientIndexSliceOfState: -1,
};


// export function shoppingListReducer(state = initalState, action: Action) {
export function shoppingListReducer(state = initalState, action: shoppingListActions.ShoppingListActions): ShoppingListState {
    // This is reducer function which will takes two argum, action
    // and state (current state of the application passed by angular but we can pass the initalState)
    // this rducer function will be triggered, whenever a action is dispatched
    // this reducer function will return update the state of our appln

    switch (action.type) {
        // case ADD_INGREDIENT: // case should be of string typeof
        case shoppingListActions.ShoppingListActionTypes.ADD_INGREDIENT: // case should be of string typeof
            return { // returns object (bcoz reducers return s immutable object)
                ...state, // ...state -> spread operator, which means add all the old state property into this object
                ingredientsArraySliceOfState: [...state.ingredientsArraySliceOfState, action.payload]
            };
        case shoppingListActions.ShoppingListActionTypes.ADD_INGREDIENTS:
            return {
                ...state, // get all the previous property of state
                ingredientsArraySliceOfState: [...state.ingredientsArraySliceOfState, ...action.payload]
                // override this property ingredientsArraySliceOfState with new value given in the RHS
            };
        case shoppingListActions.ShoppingListActionTypes.UPDATE_INGREDIENT:

            const ingredientToUpdate = state.ingredientsArraySliceOfState[state.editedIngredientIndexSliceOfState];
            const updatedIngredient = {
                ...ingredientToUpdate, // all properties of old ingredient obj (ingredient to update)
                ...action.payload.newIngredient // all properties of new ingredient object(newIngredient), this which will override all
                // the properties of the old ingredient obj
            };
            const ingredientsArrayWithUpdatedIngredient = [...state.ingredientsArraySliceOfState];
            ingredientsArrayWithUpdatedIngredient[state.editedIngredientIndexSliceOfState] = updatedIngredient;
            return {
                ...state, // get all the previous property of state
                ingredientsArraySliceOfState: ingredientsArrayWithUpdatedIngredient,
                editedIngredientSliceOfState: null,
                editedIngredientIndexSliceOfState: -1,
            };
        case shoppingListActions.ShoppingListActionTypes.DELETE_INGREDIENT:
            const ingredientsArray = [...state.ingredientsArraySliceOfState];
            ingredientsArray.splice(state.editedIngredientIndexSliceOfState, 1);
            return {
                ...state, // get all the previous property of state
                ingredientsArraySliceOfState: ingredientsArray,
                editedIngredientSliceOfState: null,
                editedIngredientIndexSliceOfState: -1,
            };

        case shoppingListActions.ShoppingListActionTypes.START_EDITING_INGREDIENT:
            const editedIngredient = { ...state.ingredientsArraySliceOfState[action.payload] };
            return {
                ...state, // get all the previous property of state
                editedIngredientSliceOfState: editedIngredient,
                editedIngredientIndexSliceOfState: action.payload
            };
        case shoppingListActions.ShoppingListActionTypes.STOP_EDITING_INGREDIENT:
            return {
                ...state, // get all the previous property of state
                editedIngredientSliceOfState: null, // reseting this property value
                editedIngredientIndexSliceOfState: -1, // reseting this property value
            };

        default:
            return state;
    }
    // return state; // behind the scenes ngrx will replace the old state with the new state

}

