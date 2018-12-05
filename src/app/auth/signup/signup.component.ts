import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.service';
import { Store } from '@ngrx/store';
import * as fromAppReducers from '../../store/app.reducers';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('FormElement') singupForm: NgForm;

  constructor(
    // private authService: AuthService,
    private store$: Store<fromAppReducers.AppState>
  ) { }

  ngOnInit() {
  }


  /* onSignUp() {
    const email = this.singupForm.value.email;
    const password = this.singupForm.value.password;
    this.authService.singup(email, password);
  } */

  onSignUp() {
    const email = this.singupForm.value.email;
    const password = this.singupForm.value.password;
    const payload = {
      email: email,
      password: password
    };
    this.store$.dispatch(new authActions.TrySignupAuthAction(payload));
  }
}
