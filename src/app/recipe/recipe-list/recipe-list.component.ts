import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe-service/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRecipeReducer from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // subscription: Subscription;
  // recipesArray: Recipe[] = []; // Array of Recipe Object
  recipesArrayState$: Observable<fromRecipeReducer.RecipeState>;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRecipeReducer.RecipesFeatureLazyModuleState>
  ) { }

  ngOnInit() {
    // !if new recipeitem is added or updated to reflect in the DOM we r emitting an event and
    // !subscribing it here
    /* this.subscription = this.recipeService.recipeChangedDOM_customEvent // since custom event so we need to unsubscribe it
      .subscribe((updatedRecipesArray: Recipe[]) => {
        this.recipesArray = updatedRecipesArray;
      });
    this.recipesArray = this.recipeService.getRecipe(); */

    this.recipesArrayState$ = this.store.pipe(select('recipeSlice')); // recipeSlice -> recipe.module.ts

  }


  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
