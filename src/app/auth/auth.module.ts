import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AuthModule { }
