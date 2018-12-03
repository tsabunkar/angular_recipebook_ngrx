import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-service/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private shoppingListService: ShoppingListService) { }


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

  /*   @ViewChild('nameInput') nameVara: ElementRef;
    @ViewChild('amountInput') amountVara: ElementRef; */

  /*
    @Output('sendIngredientObjFrmC2P_customEvent') ingredientObj = new EventEmitter<Ingredient>();

    onAddInShoppingCart() {
      // console.log(this.nameVara.nativeElement.value);
      // console.log(this.amountVara.nativeElement.value);
      const ingredientName =  this.nameVara.nativeElement.value
      const ingredientAmount =  this.amountVara.nativeElement.value
      const newIngredient = new Ingredient(ingredientName, ingredientAmount);
      this.ingredientObj.emit(newIngredient)

    }
    */

  // !using subject instead of emitting customEvent
  /*   onAddInShoppingCart() {
      const ingredientName = this.nameVara.nativeElement.value
      const ingredientAmount = this.amountVara.nativeElement.value
      const newIngredient = new Ingredient(ingredientName, ingredientAmount);
      this.shoppingListService.addIngredientsElementsToArray(newIngredient)
    } */

  onAddEditShoppingItem(ngFormVal: NgForm) {
    console.log(ngFormVal);
    const formValue = ngFormVal.value;
    const newIngredient = new Ingredient(formValue.nameControl, formValue.amountControl);
    if (this.isEditMode) {
      this.shoppingListService.updateExisitingIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredientsElementsToArray(newIngredient);
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
