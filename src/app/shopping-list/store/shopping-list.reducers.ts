import { ActionReducer, Action } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';


export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initalState = {
    ingredientsArray_Redux: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

// export function shoppingListReducer(state = initalState, action: Action) {
export function shoppingListReducer(state = initalState, action: ShoppingListAction.ShoppingListActions) {
    // This is reducer function which will takes two argum, action
    // and state (current state of the application passed by angular but we can pass the initalState)
    // this rducer function will be triggered, whenever a action is dispatched
    // this reducer function will return update the state of our appln
    switch (action.type) {
        // case ADD_INGREDIENT: // case should be of string typeof
        case ShoppingListAction.ADD_INGREDIENT: // case should be of string typeof
            return { // returns object (bcoz reducers return s immutable object)
                ...state, // ...state -> spread operator, which means add old state with the new state
                ingredients: [...state.ingredientsArray_Redux, action.payload]
            };

        default:
            return state;
    }
    // return state; // behind the scenes ngrx will replace the old state with the new state

}

