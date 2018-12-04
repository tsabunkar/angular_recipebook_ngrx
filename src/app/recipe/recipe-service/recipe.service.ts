import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-service/shopping.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
@Injectable()
export class RecipeService {
    // recipeSelected_CustomEvent_fromC2S = new EventEmitter<Recipe>();

    constructor(
        // private shoppingListService: ShoppingListService,
        private store: Store<{ shoppingListSlice: { ingredientsArraySliceOfState: Ingredient[] } }>
    ) { }

    recipeChangedDOM_customEvent = new Subject<Recipe[]>();

    private recipesArray: Recipe[] = [];
    // getters
    getRecipe(): Recipe[] {
        return this.recipesArray.slice();
        // !slice() -> we only get copy of this recipesArray, not the actual array
    }

    /* addIngredientToShoppingList(ingredientArrVal: Ingredient[]) {
        // this.shoppingListService.addIngredientsArrayToExistingIngredientArrayInShoppingList(ingredientArrVal);
        this.store.dispatch(new ShoppingListActions.AddIngredientsAction(ingredientArrVal));
    }
 */
    getRecipeDetailsFromId(index: number) {
        // return this.recipesArray.slice()[index]
        return this.recipesArray[index];
    }

    addNewRecipeOnFormSubmission(recipObj: Recipe) {
        this.recipesArray.push(recipObj);
        this.recipeChangedDOM_customEvent.next(this.recipesArray.slice());
    }

    updateRecipeOnFormSubmission(index: number, recipeObjToUpdate: Recipe) {
        this.recipesArray[index] = recipeObjToUpdate;
        this.recipeChangedDOM_customEvent.next(this.recipesArray.slice());
    }

    deleteRecipeItem(index: number) {
        this.recipesArray.splice(index, 1);
        this.recipeChangedDOM_customEvent.next(this.recipesArray.slice());
    }

    setRecipesArray(recipesArrayFromBackend: Recipe[]) {
        this.recipesArray = recipesArrayFromBackend;
        this.recipeChangedDOM_customEvent.next(this.recipesArray.slice());
    }
}
