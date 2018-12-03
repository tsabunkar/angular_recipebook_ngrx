import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AuthGuard } from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
    {
        path: '', component: RecipeComponent, children: [
            { path: '', component: RecipeStartComponent }, // http://localhost:4200/recipes
            { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] }, // http://localhost:4200/recipes/new
            { path: ':myid', component: RecipeDetailsComponent }, // http://localhost:4200/recipes/{myid}
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }, // http://localhost:4200/recipes/{id}/edit

            // !Note : dynamic paramter in the routes should come last in the priority
            // ! i.e - first preference to  http://localhost:4200/recipes/new then next prefernce to
            // ! http://localhost:4200/recipes/{myid}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class RecipesRoutingModule { }
