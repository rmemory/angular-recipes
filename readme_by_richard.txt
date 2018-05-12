Debugging techniques
====================

(1) Look at the error messages in console log.

(2) Use developer tools, go to sources tab. It shows all of the bundles,
    particularly main.bundle.js. Search for your line of code, and put
    a break point. This will jump to the appropriate TS files because of
    source maps, which are stripped out in production code.

    Or in the sources tab, open the webpack folder is where we can directly
    access the correct TS file rather than going through main.bundle.js.

    Source mapping must be turned on.

(3) Augury is a Chrome extension. It can be opened in Chrome developer tools.
    Its allows you to see the Component Tree, state, properties, injector graph,
    router tree, ngmodules.

Basic application design.

Components
==========
At the top level: app-component.

The app-component contains a header component (nav bar, drop down, etc), shopping-list, and recipe book.

The shopping list is made up of a shopping-list component and shopping-list-edit component

The recipe book is made up of a recipe-list component, recipe-item component, recipe-detail component,
and a top level recipes component

Model
=====

Ingredients
Recipe (title, description, instructions, ingriedient)

Project creation steps
======================

$ ng new recipes

$ npm install --save bootstrap@3

edit .angular-cli.json file, and add this to the styles:

"../node_modules/bootstrap/dist/css/bootstrap.min.css",

$ ng serve

Add some basic bootstrap to app-component template html file

<div class="container">
  <div class="row">
    <div class="col-md-12">

    </div>
  </div>
</div>

Create components
=================

ng g c header --spec=false
ng g c recipes --spec=false
ng g c recipes/recipe-list --spec=false
ng g c recipes/recipe-detail --spec=false
ng g c recipes/recipe-list/recipe-item --spec=false
ng g c shopping-list --spec=false
ng g c shopping-list/shopping-list-edit --spec=false

Add components to app-component
===============================

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <app-header></app-header>
      <app-recipes></app-recipes>
      <app-shopping-list></app-shopping-list>
    </div>
  </div>
</div>


Edit recipes template. Recipe list and detail will sit side by side next to each other
=====================================================================================

<div class="row">
  <div class="col-md-5">
    <app-recipe-list></app-recipe-list>
  </div>
  <div class="col-md-7">
    <app-recipe-detail></app-recipe-detail>
  </div>
</div>

The recipe list should show the recipe item
===========================================

<div class="row">
  <div class="col-xs-12">
    <app-recipe-item></app-recipe-item>
  </div>
</div>

The shopping list contains the shopping list edit
=================================================
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a
        class="list-group-item"
        style="cursor: pointer"
        *ngFor="let ingredient of ingredients">
        {{ ingredient.name }} ({{ ingredient.amount }})
      </a>
    </ul>
  </div>
</div>

Kinds of databinding
====================

(1) Those kinds of databinding that are used within the same
component.

(a) string interpolation

The HTML template is able to access any public variables or
functions found within the components type script file. The
HTML template accesses it like this:

{{ theVarName }}

Whatever is between the curly braces must resolve to a string.
The string is inline-block, like a span. It could event be a
method in the TypeScript file.

(b) Property binding

When we put square brackets around any HTML attribute and put
an equals sign after it, whatever follows in the quotes is
treated as TypeScript. For example, we can cause the disabled
attribute of a button to be enabled or disabled depening on a
variable (or function) in the TypeScript file.

<button
  class="btn btn-primary"
  [disabled]="!allowNewServer">
    Add Server
</button>

(c) Two way databinding

(d) Events within the same component

(2) Directives

ngIf

ngFor

ngStyle

ngClass

(3) Databinding for communication between components

@Input

@Output

(4) Gaining access to HTML elements

local ref

view child


