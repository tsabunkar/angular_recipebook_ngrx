import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-service/shopping.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as shoppingListActions from './store/shopping-list.actions';
import * as fromAppReducer from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

// ! Using ngRx concept to maintain state management -

export class ShoppingListComponent implements OnInit, OnDestroy {

  // * making the ingredientsArrayState$ as Observable whose type is Ingredient[]
  ingredientsArrayState$: Observable<{ ingredientsArraySliceOfState: Ingredient[] }>;

  constructor(
    // private shoppingListService: ShoppingListService,
    // private store: Store<fromShoppingListReducer.ShoppingListFeatureModuleState>
    private store: Store<fromAppReducer.AppState>
  ) { }

  // !using subject instead of emitting customEvent
  ngOnInit() {
    // this.ingredientsArray.push(this.ingredientObj1, this.ingredientObj2)

    // ! native way of maintaing the state
    // this.ingredientsArray = this.shoppingListService.getIngredients();
    // ! Using Reducer concepts to maintaining the state
    this.ingredientsArrayState$ = this.store.pipe(
      select('shoppingListSlice')
    ); // ! will give complete slice of state
    // global slice of state which was set in AppModule -> StoreModule.forRoot
  }

  // *unsubscribing the custom created subject or Observable
  ngOnDestroy(): void {

  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditingShoppingItem_CustomSubject.next(index);
    // ! instead of using subjects next using dispatch of NgRx
    this.store.dispatch(new shoppingListActions.StartEditIngredientAction(index));
  }
}

