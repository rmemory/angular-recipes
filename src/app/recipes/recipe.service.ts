import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './model/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[]=[
    new Recipe('Tasty Schnitzel',
               'A super-tasy Schnitzel - just awesome',
               'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/J%C3%A4gerschnitzel_IMG_0936.jpg/800px-J%C3%A4gerschnitzel_IMG_0936.jpg',
              [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
              ]),
    new Recipe('Big Fat Burger',
               'What else do you need to say',
               'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Burger_King_-_Angus_XT_Burger.tiff/lossless-page1-800px-Burger_King_-_Angus_XT_Burger.tiff.png',
              [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
              ])

  ];
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice(); // With slice, returns a copy not a reference
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
