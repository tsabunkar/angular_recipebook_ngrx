import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe-service/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  recipesArray: Recipe[] = []; // Array of Recipe Object

  constructor(private recipeService: RecipeService, private router: Router
    , private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // !if new recipeitem is added or updated to reflect in the DOM we r emitting an event and
    // !subscribing it here
    this.subscription = this.recipeService.recipeChangedDOM_customEvent // since custom event so we need to unsubscribe it
      .subscribe((updatedRecipesArray: Recipe[]) => {
        this.recipesArray = updatedRecipesArray;
      });
    this.recipesArray = this.recipeService.getRecipe();

  }
  /*
    recipeObj: Recipe = new Recipe('Pasta', 'Pasta dish is made of sunfest pasta', 'https://images.media-allrecipes.com/images/56589.png')
    recipeObj1: Recipe = new Recipe('Gobi Manchuri ',
     'Gobi Manchuri is an indian cum chinse dish',
     'http://s3.amazonaws.com/appforest_uf/f1486610188974x481748790945857800/Semi_Gravy_gobi__manchurian.jpg')
   */


  /*
  @Output() selectedRecipeForDetailDescriptionFrmC2P_customEvent = new EventEmitter<Recipe>();

   onClickOfSingleRecipeItem(singleRecipeElement: Recipe) {
   // console.log(singleRecipeElement);
   this.selectedRecipeForDetailDescriptionFrmC2P_customEvent.emit(singleRecipeElement);

 } */


  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
