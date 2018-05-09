import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]=[
    new Recipe('A test recipe', 'this is a test description', 'https://www.recipetineats.com/wp-content/uploads/2015/03/Honey-Garlic-Salmon-680x952.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
