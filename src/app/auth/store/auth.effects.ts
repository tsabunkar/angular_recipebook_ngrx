import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as authActions from './auth.actions';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs'; // this operator is used to converte promise type to Observable type
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions, // $ -> means its return type is observable
        private router: Router,
    ) { }

    // !below @Effect code is just replacement of signup() method written in auth-service.service.ts

    // below code has side-effect bcoz- invloves asynchronous operations
    @Effect() //  !If our effects dispatches actions (as like below) then @Effect()
    // @Effect({dispatch : false}) // !else we need to configure effects decorator
    // ! @Effect({dispatch : false}) [When our below code does not dispatch actions]

    authSignupSideEffect = this.actions$.pipe( // actions$ will have all the actions which we used in our appln
        ofType(authActions.AuthActionTypes.TRY_SIGNUP),
        // from all the actions we want to execute the below pipe code for specifc Action i.e->TrySignupAuthAction type which is TRY_SIGNUP
        map((action: authActions.TrySignupAuthAction) => {
            return action.payload; // will return type as Observable(Wrapped again as observable)
        }), // Need only payload from the Actions, so using map() operator
        switchMap((actionPayloadValue: { email: string, password: string }) => {
            return from(firebase.auth().createUserWithEmailAndPassword(actionPayloadValue.email, actionPayloadValue.password));
            // wil return observable type only
        }),  // using first switchMap() operator, it will get the result of the previously executed map() operator as input inside this
        // switchMap (which is action payload)
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }), // using second switchMap() operator, after previous switchMap is executed we need to get the token, which we r doing
        // in this switchMap() operator
        mergeMap((tokenVal: string) => { // mergeMap() allow to merge multiple observable into one single observable
            return [ // here we want to emit two actions so using mergeMap()
                { type: authActions.AuthActionTypes.SIGNUP }, // emit signup event/action
                { type: authActions.AuthActionTypes.SET_TOKEN, payload: tokenVal }, // emit SET_TOKEN  event/action
            ];
        })
    );


    // !below @Effect code is just replacement of signin() method written in auth-service.service.ts
    @Effect()
    authSigninSideEffect = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.TRY_SIGNIN),
        map((action: authActions.TrySigninAuthAction) => {
            return action.payload;
        }),
        switchMap((actionPayloadValue: { email: string, password: string }) => {
            return from(firebase.auth().signInWithEmailAndPassword(actionPayloadValue.email, actionPayloadValue.password));

        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((tokenVal: string) => {
            this.router.navigate(['/']);
            return [
                { type: authActions.AuthActionTypes.SIGNIN },
                { type: authActions.AuthActionTypes.SET_TOKEN, payload: tokenVal },
            ];
        }),
        // tap(() => this.router.navigate(['/']))
    );
}

