import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-service/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListAction from '../store/shopping-list.actions';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('formObj') shoppingList_ngForm: NgForm;
  isEditMode = false;
  mysubscription: Subscription;
  editedItemIndex: number;
  ingredientItemEdited: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingListSlice: { ingredientsArraySliceOfState: Ingredient[] } }>
  ) { }


  ngOnInit() {
    this.mysubscription = this.shoppingListService.startedEditingShoppingItem_CustomSubject
      .subscribe((index: number) => {
        this.isEditMode = true;
        this.editedItemIndex = index;
        this.ingredientItemEdited = this.shoppingListService.getIngredientItemFromIndex(index);
        this.shoppingList_ngForm.setValue({
          'nameControl': this.ingredientItemEdited.name,
          'amountControl': this.ingredientItemEdited.amount
        });
      });
  }


  onAddEditShoppingItem(ngFormVal: NgForm) {
    const formValue = ngFormVal.value;
    const newIngredient = new Ingredient(formValue.nameControl, formValue.amountControl);
    if (this.isEditMode) {
      this.shoppingListService.updateExisitingIngredient(this.editedItemIndex, newIngredient);
    } else {
      console.log('add mode', newIngredient);
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
    this.shoppingListService.deleteIngredientItemFromArray(this.editedItemIndex);
    this.onClear();
  }



  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.mysubscription.unsubscribe();
  }
}
