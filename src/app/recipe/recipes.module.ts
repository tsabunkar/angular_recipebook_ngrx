import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownCutomDirective } from '../shared/custom-directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        // DropDownCutomDirective
    ],
    imports: [
        CommonModule, // this commonModule contains all the common features like - *ngFor,*ngIf,etc
        // So this module will be generally imported in imports array for featue module
        // BrowserModule is written in app.module.ts -> this module contains CommonModule and other additional features
        // which might be used when application is loaded, So we should only is use BrowserModule in App Module(root module)
        // and CommonModule in the feature module
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],
    exports: [
    ],
    providers: [],
})
export class RecipesModule { }
