import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[]=[
    new Recipe('A test recipe',
               'this is a test description',
               'https://www.recipetineats.com/wp-content/uploads/2015/03/Honey-Garlic-Salmon-680x952.jpg'),
    new Recipe('Another test recipe',
               'this is a test description',
               'https://www.recipetineats.com/wp-content/uploads/2015/03/Honey-Garlic-Salmon-680x952.jpg')

  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    console.log(recipe);
    this.recipeWasSelected.emit(recipe);
  }

}
