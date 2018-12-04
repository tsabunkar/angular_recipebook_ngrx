import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-service/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as shoppingListAction from '../store/shopping-list.actions';
import * as fromShoppingListReducer from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('formObj') shoppingList_ngForm: NgForm;
  isEditMode = false;
  mysubscription: Subscription;
  // editedItemIndex: number;
  ingredientItemEdited: Ingredient;

  constructor(
    // private shoppingListService: ShoppingListService,
    // private store: Store<fromShoppingListReducer.ApplicationState>
    private store: Store<fromApp.AppState>
  ) { }


  ngOnInit() {
    /*  this.mysubscription = this.shoppingListService.startedEditingShoppingItem_CustomSubject
       .subscribe((index: number) => {
         this.isEditMode = true;
         this.editedItemIndex = index;
         this.ingredientItemEdited = this.shoppingListService.getIngredientItemFromIndex(index);
         this.shoppingList_ngForm.setValue({
           'nameControl': this.ingredientItemEdited.name,
           'amountControl': this.ingredientItemEdited.amount
         });
       });
  */
    // ! instead of using subjects subsribe using select of NgRx
    this.mysubscription = this.store.pipe(
      select('shoppingListSlice')  // global slice of state which was set in AppModule -> StoreModule.forRoot
    )
      .subscribe(
        data => {
          if (data.editedIngredientIndexSliceOfState > -1) {
            // is in edit mode
            this.isEditMode = true;
            this.ingredientItemEdited = data.editedIngredientSliceOfState;
            this.shoppingList_ngForm.setValue({
              'nameControl': this.ingredientItemEdited.name,
              'amountControl': this.ingredientItemEdited.amount
            });
          } else {
            // is in create mode
            this.isEditMode = false;
          }
        }
      );
  }


  onAddEditShoppingItem(ngFormVal: NgForm) {
    const formValue = ngFormVal.value;
    const newIngredient = new Ingredient(formValue.nameControl, formValue.amountControl);
    if (this.isEditMode) {
      // this.shoppingListService.updateExisitingIngredient(this.editedItemIndex, newIngredient);
      const payload = {
        newIngredient: newIngredient
      };

      this.store.dispatch(new shoppingListAction.UpdateIngredientAction(payload));
    } else {
      // this.shoppingListService.addIngredientsElementsToArray(newIngredient);
      this.store.dispatch(new shoppingListAction.AddIngredientAction(newIngredient));
    }
    // need to reset the form
    ngFormVal.reset();
    this.isEditMode = false;

  }

  onClear() {
    this.shoppingList_ngForm.reset();
    this.isEditMode = false;
  }

  onDeleteOfIngredient() {
    // this.shoppingListService.deleteIngredientItemFromArray(this.editedItemIndex);
    this.store.dispatch(new shoppingListAction.DeleteIngredientAction());
    this.onClear();
  }



  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.mysubscription.unsubscribe();

    this.store.dispatch(new shoppingListAction.StopEditIngredientAction()); // reseting the property values
  }
}
