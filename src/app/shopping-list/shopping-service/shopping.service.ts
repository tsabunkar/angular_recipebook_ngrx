import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

    // we need to tell the browser/Page that new ingredient element is added to ingredients Array
    // ingredientElementAddedToIngredientArray_CustomEvent = new EventEmitter<Ingredient[]>();
    // !using subject instead of emitting customEvent
   /*  ingredientElementAddedToIngredientArray_CustomSubject = new Subject<Ingredient[]>();
    startedEditingShoppingItem_CustomSubject = new Subject<number>();
 */
    constructor() { }

  /*   private ingredients: Ingredient[] = [
        new Ingredient('Laptop', 100000),
        new Ingredient('Keyboard', 999)
    ]; */

    /*   getIngredients() : Ingredient[] {
          return this.ingredients; //remove slice()
      } */
/*     getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    } */

 /*    addIngredientsElementsToArray(ingredientElement: Ingredient): void {
        this.ingredients.push(ingredientElement);
        // emitting a event, and telling other components that ingredient element has been added to array
        // this.ingredientElementAddedToIngredientArray_CustomEvent.emit(this.ingredients.slice())
        this.ingredientElementAddedToIngredientArray_CustomSubject.next(this.ingredients.slice());
    } */


   /*  addIngredientsArrayToExistingIngredientArrayInShoppingList(ingredientsArra: Ingredient[]) {
        //    for (const ingred of ingredientsArra) {
        //        this.addIngredientsElementsToArray(ingred)
        //    }

        // above method work, but let us use spread operator apporach

        this.ingredients.push(...ingredientsArra);
        // emit an event, letting other compo's know that new ingredients (array) are added to ingredientsArraay
        // this.ingredientElementAddedToIngredientArray_CustomEvent.emit(this.ingredients.slice())
        this.ingredientElementAddedToIngredientArray_CustomSubject.next(this.ingredients.slice());

    } */

   /*  getIngredientItemFromIndex(index: number) {
        return this.ingredients[index];
    }

    updateExisitingIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientElementAddedToIngredientArray_CustomSubject.next(this.ingredients.slice());
    }

    deleteIngredientItemFromArray(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientElementAddedToIngredientArray_CustomSubject.next(this.ingredients.slice());
    } */

    // !this service is completely managed by NgRx, so we can delete this file
}
