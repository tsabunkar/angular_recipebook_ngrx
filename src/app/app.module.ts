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
    // * registring the ngrx, it is used for eagerly loading module
    StoreModule.forRoot({ customShoppingListReducer: shoppingListReducer })
  ],
  providers: [
    /*   ShoppingListService, RecipeService, RecipeStorageBackendService,
      AuthService, AuthGuard */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
