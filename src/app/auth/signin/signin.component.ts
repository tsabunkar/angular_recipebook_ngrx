import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.service';
import * as fromAppReducers from '../../store/app.reducers';
import * as authActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    // private authService: AuthService,
    private store$: Store<fromAppReducers.AppState>
  ) { }

  @ViewChild('FormElement') singinForm: NgForm;

  ngOnInit() {
  }

  /*  onSignIn() {
     const email = this.singinForm.value.email;
     const password = this.singinForm.value.password;
     this.authService.signin(email, password);
   } */
  onSignIn() {
    const email = this.singinForm.value.email;
    const password = this.singinForm.value.password;
    const payload = {
      email: email,
      password: password
    };
    this.store$.dispatch(new authActions.TrySigninAuthAction(payload));
  }
}
