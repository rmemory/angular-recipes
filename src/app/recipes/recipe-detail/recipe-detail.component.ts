import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from  '@angular/router';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // The usage of subscribe here is required to reflect changes in
    // the path, which angular doesn't automatically notify us of
    // unless we subscribe, like this because params is an observable
    this.route.params.subscribe(
      (params: Params) => {
        // plus sign casts the id from a string to a number
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
