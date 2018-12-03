import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-service/shopping.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    // recipeSelected_CustomEvent_fromC2S = new EventEmitter<Recipe>();

    constructor(private shoppingListService: ShoppingListService) { }

    recipeChangedDOM_customEvent = new Subject<Recipe[]>();

    // making this recipesArray as private, so that this property will be encapsulated from outside
    /*
        private recipesArray: Recipe[] = [
            new Recipe('Pasta', 'Pasta dish is made of sunfest pasta',
                'https://images.media-allrecipes.com/images/56589.png',
                [
                    new Ingredient('Veges', 1),
                    new Ingredient('tomato', 20),
                    new Ingredient('chilly', 5),
                ]),
            new Recipe('Gobi Manchuri ', 'Gobi Manchuri is an indian cum chinse dish',
                'http://s3.amazonaws.com/appforest_uf/f1486610188974x481748790945857800/Semi_Gravy_gobi__manchurian.jpg',
                [
                    new Ingredient('gobi', 1),
                    new Ingredient('tomato', 20),
                    new Ingredient('oil', 45),
                    new Ingredient('green piece', 90)
                ])
        ];

     */
    private recipesArray: Recipe[] = [];
    // getters
    getRecipe(): Recipe[] {
        return this.recipesArray.slice();
        // !slice() -> we only get copy of this recipesArray, not the actual array
    }

    addIngredientToShoppingList(ingredientArrVal: Ingredient[]) {
        this.shoppingListService.addIngredientsArrayToExistingIngredientArrayInShoppingList(ingredientArrVal);
    }

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
