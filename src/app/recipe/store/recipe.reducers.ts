import { Recipe } from '../models/recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import * as recipeActions from './recipe.actions';

export interface RecipesFeatureLazyModuleState {
    recipesSliceOfState: RecipeState;
}

export interface RecipeState {
    recipesArraySliceOfState: Recipe[];
}

const initalState: RecipeState = {
    recipesArraySliceOfState: [
        new Recipe('Default Recipe',
            'Default Decription',
            'https://avatars0.githubusercontent.com/u/24843900?s=460&v=4',
            [
                new Ingredient('Tejas', 1),
                new Ingredient('Sabunkar', 2)
            ])
    ]
};

export function recipeReducer(state = initalState, action: recipeActions.RecipesActions)
    : RecipeState {

    switch (action.type) {

        case (recipeActions.RecipeActionTypes.SET_RECIPES):
            return {
                ...state,
                recipesArraySliceOfState: [...action.payload]
            };


        case (recipeActions.RecipeActionTypes.ADD_RECIPE):
            return {
                ...state,
                recipesArraySliceOfState: [...state.recipesArraySliceOfState, action.payload]
            };


        case (recipeActions.RecipeActionTypes.UPDATE_RECIPE):
            const findOldRecipeObjWhichNeedToUpdated = state.recipesArraySliceOfState[action.payload.indexProp];
            const newlyUpdatedRecipe = {
                ...findOldRecipeObjWhichNeedToUpdated, // previous recipe object -> findOldRecipeObjWhichNeedToUpdated
                ...action.payload.updatedRecipeProp
                // newly edited recipe object, will override the property value of previous recipe object
            };
            const recipesArray = [...state.recipesArraySliceOfState]; // getting recipesArray in immutable way
            // now replce the old recipe object with the newly updated recipe object
            recipesArray[action.payload.indexProp] = newlyUpdatedRecipe;
            return {
                ...state,
                recipesArraySliceOfState: recipesArray
            };


        case (recipeActions.RecipeActionTypes.DELETE_RECIPE):
            const oldRecipesArray = [...state.recipesArraySliceOfState]; // all the old recipe object
            // remove a particular recipe object from the Array of oldRecipesArray
            oldRecipesArray.splice(action.payload, 1); // payload -> is the index (number type)
            return {
                ...state,
                recipesArraySliceOfState: oldRecipesArray
            };


        default:
            return state;
    }

}

