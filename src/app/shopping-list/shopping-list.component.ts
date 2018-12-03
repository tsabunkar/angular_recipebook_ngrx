import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-service/shopping.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
// ! Using native Angular concept to maintain for state management -
/*
export class ShoppingListComponent implements OnInit, OnDestroy {

  private mysubscription: Subscription;
  ingredientsArray: Ingredient[] = [];
  // ingredirentObjectAddedProp : Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  // ngOnInit() {
  //   // this.ingredientsArray.push(this.ingredientObj1, this.ingredientObj2)
  //   this.ingredientsArray = this.shoppingListService.getIngredients();
  //   this.shoppingListService.ingredientElementAddedToIngredientArray_CustomEvent
  //     .subscribe((ingredEle: Ingredient[]) => {
  //       this.ingredientsArray = ingredEle
  //     })
  // }

  // !using subject instead of emitting customEvent
  ngOnInit() {
    // this.ingredientsArray.push(this.ingredientObj1, this.ingredientObj2)
    this.ingredientsArray = this.shoppingListService.getIngredients();
    this.mysubscription = this.shoppingListService.ingredientElementAddedToIngredientArray_CustomSubject
      .subscribe((ingredEle: Ingredient[]) => {
        this.ingredientsArray = ingredEle;
      });
  }

  // ingredientObj1: Ingredient = new Ingredient('Laptop', 100000);
  // ingredientObj2: Ingredient = new Ingredient('Keyboard', 999);

  //  ingredirentObjectAddedFunc(event: Ingredient) {
  //    this.ingredientsArray.push(event)
  //  }

  // *unsubscribing the custom created subject or Observable
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.mysubscription.unsubscribe(); // this will prevent any memory leak, whil creating own subject/observable
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditingShoppingItem_CustomSubject.next(index);
  }
}
 */

// ! Using ngRx concept to maintain state management -

export class ShoppingListComponent implements OnInit, OnDestroy {

  // private mysubscription: Subscription;
  // ingredientsArray: Ingredient[] = [];
  // * making the ingredientsArray as Observable whose type is Ingredient[]
  ingredientsArray: Observable<{ ingredientsArray_Redux: Ingredient[] }>;

  // ingredirentObjectAddedProp : Ingredient;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{ customShoppingListReducer: { ingredientsArray_Redux: Ingredient[] } }>
  ) { }

  // ngOnInit() {
  //   // this.ingredientsArray.push(this.ingredientObj1, this.ingredientObj2)
  //   this.ingredientsArray = this.shoppingListService.getIngredients();
  //   this.shoppingListService.ingredientElementAddedToIngredientArray_CustomEvent
  //     .subscribe((ingredEle: Ingredient[]) => {
  //       this.ingredientsArray = ingredEle
  //     })
  // }

  // !using subject instead of emitting customEvent
  ngOnInit() {
    // this.ingredientsArray.push(this.ingredientObj1, this.ingredientObj2)

    // * native way of maintaing the state
    // this.ingredientsArray = this.shoppingListService.getIngredients();
    // * Using Reducer concepts to maintaining the state
    this.ingredientsArray = this.store.select('customShoppingListReducer');


    //  this.mysubscription = this.shoppingListService.ingredientElementAddedToIngredientArray_CustomSubject
    //    .subscribe((ingredEle: Ingredient[]) => {
    //      this.ingredientsArray = ingredEle;
    //    });

  }

  // ingredientObj1: Ingredient = new Ingredient('Laptop', 100000);
  // ingredientObj2: Ingredient = new Ingredient('Keyboard', 999);

  //  ingredirentObjectAddedFunc(event: Ingredient) {
  //    this.ingredientsArray.push(event)
  //  }

  // *unsubscribing the custom created subject or Observable
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    // this.mysubscription.unsubscribe(); // this will prevent any memory leak, whil creating own subject/observable
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditingShoppingItem_CustomSubject.next(index);
  }
}

