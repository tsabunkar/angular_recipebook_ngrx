// !Global Application wide Reducer function which is used throught the application
// !Here we bundle all other States (all other moduels state)


import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

// !Application wide State
export interface AppState {
    // shoppingList: fromShoppingList.ApplicationState;
    shoppingListSliceOfState: fromShoppingList.ApplicationState;
    auth: fromAuth.AuthState;
}

/*
// !Application wide Reducers
export const AppReducers: ActionReducerMap<AppState> = {
    shoppingListSlice: fromShoppingList.shoppingListReducer,
    authenticationSlice: fromAuth.authReducer
}; */

