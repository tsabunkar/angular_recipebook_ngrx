import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    SIGNUP = '[Authentication] Signup new user',
    SIGNIN = '[Authentication] Signin existing user',
    LOGOUT = '[Authentication] logout the user whose already signed-in',
    SET_TOKEN = '[Authentication] Set the token value',
    TRY_SIGNUP = '[Authentication] Trying to SignUp',
    TRY_SIGNIN = '[Authentication] Trying to SignIn',
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
export class TrySignupAuthAction implements Action {
    readonly type = AuthActionTypes.TRY_SIGNUP;

    constructor(public payload: {
        email: string,
        password: string
    }) { }
}
export class TrySigninAuthAction implements Action {
    readonly type = AuthActionTypes.TRY_SIGNIN;

    constructor(public payload: {
        email: string,
        password: string
    }) { }
}


export type AuthenticationActions = SignupAuthAction
    | SigninAuthAction
    | LogoutAuthAction
    | SetTokenAuthAction
    | TrySignupAuthAction
    | TrySigninAuthAction;

