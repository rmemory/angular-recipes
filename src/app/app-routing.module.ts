import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  // usage of patchMatch full overrides the "prefix" default, and indicates we should redirect only if
  // the full path is empty
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},

  { path: 'recipes', component: RecipesComponent, children: [
    // This first child is for /recipes/empty (hence the empty string)
    // See the router outlet in recipes.component.html
    { path: '', component: RecipeStartComponent },

    { path: 'new', component: RecipeEditComponent},

    // The following child path will be /recipes/:id
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent}
  ] },
  { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
