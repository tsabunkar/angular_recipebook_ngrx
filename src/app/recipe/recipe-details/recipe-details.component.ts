import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe-service/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipeReducer from '../store/recipe.reducers';
import * as fromShoppingListReducer from '../../shopping-list/store/shopping-list.reducers';
import * as fromAppReducer from '../../store/app.reducers';
import * as recipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private store: Store<fromShoppingListReducer.ShoppingListFeatureModuleState>
    // private store: Store<fromAppReducer.AppState>
    private store: Store<fromRecipeReducer.RecipesFeatureLazyModuleState>
  ) { }


  // recipeObj: Recipe;
  // !instead using ngRx
  recipeState$: Observable<fromRecipeReducer.RecipeState>;
  recipeid: number;


  // @Input('detailededRecipeFromP2C') recipeObj: Recipe;

  onClickOfAddIngredientToShoppingList() {
    // this.recipeService.addIngredientToShoppingList(this.recipeObj.ingredients);
    this.store.pipe(
      select('recipeSlice'),
      take(1) // doesnot fire for every state changes, but fires only one
    ).subscribe((recipeStateVal: fromRecipeReducer.RecipeState) => {
      this.store.dispatch(new shoppingListActions.AddIngredientsAction
        (recipeStateVal.recipesArraySliceOfState[this.recipeid].ingredients));
    });
  }


  ngOnInit() {
    // const fetchingId = this.activatedRoute.snapshot.params["myid"];
    /*  this.activatedRoute.params.subscribe((param: Params) => {
       console.log('route parmas value', param);
       console.log(+param['myid']);
       this.recipeid = +param['myid'];
       this.recipeObj = this.recipeService.getRecipeDetailsFromId(this.recipeid);
     }); */
    this.activatedRoute.params.subscribe((param: Params) => {
      console.log('route parmas value', param);
      console.log(+param['myid']);
      this.recipeid = +param['myid'];
      // this.recipeObj = this.recipeService.getRecipeDetailsFromId(this.recipeid);
      this.recipeState$ = this.store.pipe(select('recipeSlice'));
    });



  }

  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
    // !alternative logic :)
    this.router.navigate(['../', this.recipeid, 'edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe() {
    const index = this.recipeid;
    // this.recipeService.deleteRecipeItem(index);
    this.store.dispatch(new recipesActions.DeleteRecipeAction(index));
    this.router.navigate(['/recipes']);
  }

}
