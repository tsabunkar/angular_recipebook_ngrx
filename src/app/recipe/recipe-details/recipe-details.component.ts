import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe-service/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute
    , private router: Router) { }


  recipeObj: Recipe;
  recipeid: number;

  // @Input('detailededRecipeFromP2C') recipeObj: Recipe;

  onClickOfAddIngredientToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipeObj.ingredients);
    // ingredients -> is an array of ingredient elements
  }


  ngOnInit() {
    // const fetchingId = this.activatedRoute.snapshot.params["myid"];
    this.activatedRoute.params.subscribe((param: Params) => {
      console.log('route parmas value', param);
      console.log(+param['myid']);
      this.recipeid = +param['myid'];
      this.recipeObj = this.recipeService.getRecipeDetailsFromId(this.recipeid);
    });
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
    // !alternative logic :)
    this.router.navigate(['../', this.recipeid, 'edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe() {
    const index = this.recipeid;
    this.recipeService.deleteRecipeItem(index);
    this.router.navigate(['/recipes']);
  }

}
