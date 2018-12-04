import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-service/shopping.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

// ! Using ngRx concept to maintain state management -

export class ShoppingListComponent implements OnInit, OnDestroy {

  // * making the ingredientsArray as Observable whose type is Ingredient[]
  ingredientsArray: Observable<{ ingredientsArraySliceOfState: Ingredient[] }>;

  constructor(
    // private shoppingListService: ShoppingListService,
    // private store: Store<fromShoppingListReducer.ApplicationState>
    private store: Store<fromApp.AppState>
  ) { }

  // !using subject instead of emitting customEvent
  ngOnInit() {
    // this.ingredientsArray.push(this.ingredientObj1, this.ingredientObj2)

    // ! native way of maintaing the state
    // this.ingredientsArray = this.shoppingListService.getIngredients();
    // ! Using Reducer concepts to maintaining the state
    this.ingredientsArray = this.store.select('shoppingListSlice');
    // global slice of state which was set in AppModule -> StoreModule.forRoot
  }

  // *unsubscribing the custom created subject or Observable
  ngOnDestroy(): void {

  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditingShoppingItem_CustomSubject.next(index);
    // ! instead of using subjects next using dispatch of NgRx
    this.store.dispatch(new ShoppingListActions.StartEditIngredientAction(index));
  }
}

