import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @ViewChild('FormElement') singinForm: NgForm;

  ngOnInit() {
  }

  onSignIn() {
    const email = this.singinForm.value.email;
    const password = this.singinForm.value.password;
    this.authService.signin(email, password);

  }
}
