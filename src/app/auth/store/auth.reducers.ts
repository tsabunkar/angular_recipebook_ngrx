import * as fromAuthenticationActions from './auth.actions';

export interface AuthState {
    tokenSliceOfState: string;
    isAuthenticatedSliceOfState: boolean;
}

const initalState: AuthState = {
    tokenSliceOfState: null,
    isAuthenticatedSliceOfState: false // by default user should not be authenticated at starting of the appn
};

export function authReducer(state = initalState, action: fromAuthenticationActions.AuthenticationActions) {

    switch (action.type) {

        case (fromAuthenticationActions.AuthActionTypes.SIGNUP): // both the cases have same body
        case (fromAuthenticationActions.AuthActionTypes.SIGNIN):
            return {
                ...state,
                isAuthenticatedSliceOfState: true
            };

        case (fromAuthenticationActions.AuthActionTypes.LOGOUT):
            return {
                ...state,
                tokenSliceOfState: null,
                isAuthenticatedSliceOfState: false
            };
        case (fromAuthenticationActions.AuthActionTypes.SET_TOKEN):
            return {

            };
        default:
            return state;
    }

}

