import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    SIGNUP = '[Authentication] Signup new user',
    SIGNIN = '[Authentication] Signin existing user',
    LOGOUT = '[Authentication] logout the user whose already signed-in',
    SET_TOKEN = '[Authentication] Set the token value'
}

export class SignupAuthAction implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor() { }
}
export class SigninAuthAction implements Action {
    readonly type = AuthActionTypes.SIGNIN;
    constructor() { }
}
export class LogoutAuthAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
    constructor() { }
}
export class SetTokenAuthAction implements Action {
    readonly type = AuthActionTypes.SET_TOKEN;

    constructor(public payload: string) { } // jwt token so string
}


export type AuthenticationActions = SignupAuthAction
    | SigninAuthAction
    | LogoutAuthAction
    | SetTokenAuthAction;

