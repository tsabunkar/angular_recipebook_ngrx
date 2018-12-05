// !Global Application wide Reducer function which is used throught the application
// !Here we bundle all other States (all other moduels state)

import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducers';
import * as fromAuthReducer from '../auth/store/auth.reducers';


// !Application wide State
export interface AppState {
    // shoppingList: fromShoppingList.ApplicationState;
    shoppingListSlice: fromShoppingListReducer.ShoppingListState;
    authSlice: fromAuthReducer.AuthState;
}


// !Application wide Reducers
export const applicationReducers: ActionReducerMap<AppState> = { // ActionReducerMap is used to map all the reducers
    shoppingListSlice: fromShoppingListReducer.shoppingListReducer,
    authSlice: fromAuthReducer.authReducer
};

