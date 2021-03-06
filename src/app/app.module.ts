import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';
import { authReducer } from './auth/store/auth.reducers';
import { applicationReducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    // DropDownCutomDirective, //made this directive as -> shared module
  ],
  imports: [ // ? Modules which r declared in the imports array in Appmodule are EAGERLY_LOADED
    BrowserModule,
    /*  BrowserModule is written in app.module.ts -> this module contains CommonModule and other additional features
      which might be used when application is loaded, So we should only is use BrowserModule in App Module(root module)
     and CommonModule in the feature module */

    AppRoutingModule,
    // RecipesModule, // ? let us make this (RecipesModule) module lazy loaded rather than eagerly loaded
    FormsModule, // template-driven forms
    // ReactiveFormsModule, // Reactive Forms
    HttpClientModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    // * registring the Application store, it is used for eagerly loading module
    // StoreModule.forRoot({ shoppingListSlice: shoppingListReducer }), // global slice of state
    // !above code is moved to app.reducers.ts
    StoreModule.forRoot(applicationReducers),

    EffectsModule.forRoot([AuthEffects]), // !Registering NgRx Effects
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'RecipeBook State Managment',
      maxAge: 25,
      logOnly: environment.production
    }) : []
  ],
  providers: [
    /*   ShoppingListService, RecipeService, RecipeStorageBackendService,
      AuthService, AuthGuard */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
