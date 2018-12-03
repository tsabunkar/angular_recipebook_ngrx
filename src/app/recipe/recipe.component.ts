import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './recipe-service/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  // providers: [RecipeService]//All the child components of this RecipeComponent will have same instance of RecipeService
  // service
})
export class RecipeComponent implements OnInit {

  // constructor(private recipeService: RecipeService) { }

  ngOnInit() {
   /*  this.recipeService.recipeSelected_CustomEvent_fromC2S.subscribe(
      (recipeVal) => {
        this.detailedRecipeElementSend2Child = recipeVal
      }
    ) */
  }

  // detailedRecipeElementSend2Child: Recipe


  /*
    detailedRecipeELementRxedAtParent(detailedRecipeELement: Recipe) { //detailedRecipeELement -> Recieved
      //from child Comp (RecipeListComponent) to Parent Compo (RecipeComponent)

      this.detailedRecipeElementSend2Child = detailedRecipeELement
    } */




  //  ###################2nd way of doing above logic####################################

  // detailedRecipeELementRxedAtParentProperty: Recipe

  // #######################################################################################

}
