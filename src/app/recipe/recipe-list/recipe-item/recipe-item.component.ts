import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../recipe-service/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // @Input('singleRecipeItemPropBindingfromParnt2Child') recipe: Recipe;
  @Input('singleRecipeItemPropBindingfromParnt2Child') singleRecipeItemPropBindingfromParnt2Child: Recipe;

  /*

    constructor(private recipeService: RecipeService) { } */


  ngOnInit() {

  }

  /*   @Output() recipeSelectedFromRecipeItem_customEvent_FrmC2P = new EventEmitter<void>(); */
  /*   onClickOfSingleRecipeItemSelected() {
      // console.log('onClickOfSingleRecipeItem');
      //  this.recipeSelectedFromRecipeItem_customEvent_FrmC2P.emit();

      this.recipeService.recipeSelected_CustomEvent_fromC2S.emit(this.recipe);
    }
   */

}
