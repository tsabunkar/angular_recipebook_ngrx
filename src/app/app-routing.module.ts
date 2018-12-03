import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: '/recipes' },
    { path: '', component: HomeComponent },
    /*  {
         path: 'recipes', component: RecipeComponent, children: [
             { path: '', component: RecipeStartComponent }, // http://localhost:4200/recipes
             { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] }, // http://localhost:4200/recipes/new
             { path: ':myid', component: RecipeDetailsComponent }, // http://localhost:4200/recipes/{myid}
             { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }, // http://localhost:4200/recipes/{id}/edit

             // !Note : dynamic paramter in the routes should come last in the priority
             // ! i.e - first preference to  http://localhost:4200/recipes/new then next prefernce to
             // ! http://localhost:4200/recipes/{myid}
         ]
     }, */
    { path: 'shopping-list', component: ShoppingListComponent },
    /*  { path: 'signup', component: SignupComponent },
     { path: 'signin', component: SigninComponent }, */

    // {path: 'recipes', component: RecipeComponent}, // ? Eagerly loading
    { path: 'recipes', loadChildren: './recipe/recipes.module#RecipesModule' }, // ? Lazy loading
    // loadChildren -> takes string (relative path of the module) which we want to lazyly load
    // (string -> Relative path of the module file which we want to lazyly load[*.module.ts]
    // followed by # then Module name)
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    // preloading the lazy loaded routes -> using preloadingStrategy
    // there r different values for this property i.e- NoPreloading (bydefault), PreloadAllModules, etc
    // PreloadAllModules -> preload all the modules which r lazyly loaded
    exports: [RouterModule],
})
export class AppRoutingModule { }

