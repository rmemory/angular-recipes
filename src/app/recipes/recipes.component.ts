import { Component, OnInit } from '@angular/core';
import { Recipe } from "./model/recipe.model";
import { RecipeService } from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    //listen to selectedRecipe event emitter on RecipeService
    // No need to chain a bunch of output events from recipe-item
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) =>
    {
      this.selectedRecipe = recipe;
    });
  }
}
