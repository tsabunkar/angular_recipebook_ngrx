import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuthReducer from '../store/auth.reducers';
import * as authenticationActions from '../store/auth.actions';

@Injectable()
export class AuthService {

  // currentTokenValue: string;

  constructor(
    private router: Router,
    private store: Store<fromAuthReducer.AuthState>
  ) { }

  // ! below signup() method code has async code/operations, which is cannot be executed in Reducers func in NgRx

  /* singup(email: string, password: string) {
    const promiseObj = firebase.auth().createUserWithEmailAndPassword(email, password); // this will create a
    // new user with email and password in firebase db
    promiseObj.then(
      user => {
        this.store.dispatch(new authenticationActions.SignupAuthAction());
        this.getTokenValue();
      }
    ).catch(
      err => console.log(err)
    );

  }



  signin(email: string, password: string) {
    console.log('calling from auth service for signin method');
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        resp => {
          this.store.dispatch(new authenticationActions.SigninAuthAction());
          this.getTokenValue();
          this.router.navigate(['/']); // redirecting the user form signin to home page i.e-
          // from 'http://localhost:4200/signin'  to -> 'http://localhost:4200'
        }
      )
      .catch(err => console.log(err));
  }


  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new authenticationActions.LogoutAuthAction());
  }

  getTokenValue() {
    // get the token here
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.store.dispatch(new authenticationActions.SetTokenAuthAction(token));
        }
      );
  } */
}
