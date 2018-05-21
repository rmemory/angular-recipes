import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './model/recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[]=[
    new Recipe('A test recipe',
               'this is a test description',
               'https://www.recipetineats.com/wp-content/uploads/2015/03/Honey-Garlic-Salmon-680x952.jpg'),
    new Recipe('Another test recipe',
               'this is a test description',
               'https://www.recipetineats.com/wp-content/uploads/2015/03/Honey-Garlic-Salmon-680x952.jpg')

  ];
  constructor() { }

  getRecipes() {
    return this.recipes.slice(); // With slice, returns a copy not a reference
  }



}
