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

View Encapsulation
==================

By default, CSS styles applied to any given component are treated as
local to that component, but to make the styles global we can apply the
encapsulation property to the @Component directive:

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})

Projecting a view from a parent to the child
============================================

This uses ng-content. The parent looks like this:

      <app-server-element
      *ngFor="let serverElement of serverElements"
      [srvElement]="serverElement">
      <p>
        <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
        <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
      </p>
    </app-server-element>

And the child (in this case the app-server-element) looks like this:

<ng-content></ng-content>

The stuff in the <p> from the parent gets inserted into the ng-content location in
the child.

Note that we can gain access an HTML reference using the @ContentChild mechanism.

Here is what it looks like in the parent HTML (note the addition of the #contentParagraph):

      <p #contentParagraph>
        <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
        <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
      </p>

And in the child TypeScript, we do this:

@ContentChild('contentParagraph') paragraph: ElementRef;

The paragraph value should be available during and after ngAfterViewInit lifecycle.



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

This is essentially a one way binding, meaning the template knows
when the string value changes in TypeScript.

(b) Property binding

When we put square brackets around any HTML attribute and put
an equals sign after it, whatever follows in the quotes is
treated as TypeScript. For example, we can cause the disabled
attribute of a button to be enabled or disabled depening on a
variable (or function) in the TypeScript file.

This is essentially a one way binding, meaning the template knows
when the property bound value changes.

<button
  class="btn btn-primary"
  [disabled]="!allowNewServer">
    Add Server
</button>

(c) Two way databinding between the template and TypeScript (r/W both ways). In
other words, the template notifies TypeScript when the value changes and the
TypeScript notifies the template when the value changes.

In the template, the syntax looks like this:

<label>Some name</label>
<input
  type="text"
  class="form-control"
  [(ngModel)]="someServerName">

In the TypeScript it simply looks like this:

 serverName = "";

(d) Events within the same component. This example shows how to register an event
listener with a button:

<button
  class="btn btn-primary"
  [disabled]="!allowNewServer"
  (click)="onCreateServer()">
  Add Server
</button>

Inside the parenthesis is any event type. Also, the listener callback can take the
event in the for of onUpdateSeverName($event), and inside of the TypeScript looks
like this:

onUpdateSeverName(event: any) {
  this.serverName = event.target.value;
}

(although in this case, it could equally be handled by two way data as shown above)

(2) Directives

Some directives, like ngIf and ngFor are considered "structural" in that they
directly affect the structure of the DOM.

(a) ngIf is a structural directive, meaning it changes the structure
of the DOM (either the element is added or it is not). The element isn't
merely hidden.

<p *ngIf="any expression returning true or false">Server was create, server name is {{serverName}}</p>

Here is an example,
<p *ngIf="serverCreated">Server was create, server name is {{serverName}}</p>

Where serverCreated is a public variable in the TypeScript.

There is also an "else case" for ngIf. Here is an example. Note the code following
the semicolon, and usage of the ng-template block.

<p *ngIf="serverCreated; else noServer">Server was create, server name is {{serverName}}</p>
<ng-template #noServer>
<p>No server was created</p>
</ng-template>

(b) ngFor is a directive used to loop over a list (or iterable) and create elements
or components accordingly.

Lets say we have an array in our TypeScript.

servers = ['Testserver', 'Testserver 2'];

In the template, we can then loop over that list to create multiple components
like this:

<app-server *ngFor="let server of servers">The server is {{$server}}<app-server>

In order to get the counter index in the for loop, we could do this:

<app-server *ngFor="let server of servers; let i = index">The server is {{$server}}<app-server>

index is a reserved word in that case.

(c) ngStyle is a directive that can be used to conditionally apply CSS styles.

This one is not a structural directive
because it doesn't impact the structure of the DOM (ie. no elements are
added or removed). This one just updates styles.

Lets say in our TypeScript constructor we add this code:

constructor() {
  this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
}

Meaning sometimes serverStatus is online sometimes its offline, randomly.

Now lets say we want to change the color of the text depending on the
server status. Note the usage of property binding, square brackets around
ngStyle. In other words, we are binding to the ngStyle property of the
ngStyle directive.

It expects to get a java script object, and that is where we define the
CSS styles which are to be applied as key value pairs. For example,

{backgroundColor: getColor()}

Where the camel case backgroundColor turns into background-color, and
the getColor method returns a string containing the appropriate color.
For example, in this case either 'red' or 'green' depending on the server
status. Doesn't have to be a method. Could be hardcoded color strings.

<p [ngStyle="{backgroundColor: getColor()}"]=>The server status is {{ serverStatus }} </p>

(d) The ngClass dynamically assigns CSS classes to elements.

Lets say we have CSS class:

.online {
  color: white;
}

<p [ngClass="{online: isServerStatus === 'online'}"]=>The server status is {{ serverStatus }} </p>

Note that in this example, online class is only applied if the isServerStatus
property is set to a value of 'online'.

ngClass only adds the class if the condition is true.

(3) Databinding for communication between components

(a) To receive data as an input from a parent component, we use the
"Input" API.

In the template HTML, it looks simiply like this (ie. string interpolation)

<div class="panel-heading">{{ element.name }}

Where element is received in the TypeScript, like this:

@Input('srvElement') element: {type: string, name: string, content: string};

We must import Input in the child TypeScript, like this:

import { Component, OnInit, Input,

Notice in this case, we are receiving an object, which is given the variable
name of "element". It is sent to the child TypeScript from the parent HTML template
using the 'srvElement' alias.

      <app-server-element
      *ngFor="let serverElement of serverElements"
      [srvElement]="serverElement">



(b) To receive output from a child component, we use the Output Angular API. This
emits an event from the child which is received by the parent.

  @Output() serverCreated = new EventEmitter<{name: string, content: string}>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<{name: string, content: string}>();

Note that both Output and EventEmitter must be imported.

import { Component, OnInit, EventEmitter, Output,

The data from the child template HTML can use two way databinding (ngModel) to report
the event, or it can use a local HTMLref, or it can use viewchild.

(aa) Here is the ngModel two-way example:

<input type="text" class="form-control" [(ngModel)]="newServerName">

where newServerName is variable located in the child TypeScript.

(bb) Here is the local HTML ref example:

    <input
      type="text"
      class="form-control"
      #serverNameInput>

      <button
        class="btn btn-primary"
        (click)="onAddServer(serverNameInput)">Add Server</button>

When received by the TypeScript, serverNameInput is a reference to the input
HTML element as reflected here:

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({name: nameInput.value,
                            content: this.serverContentInput.nativeElement.value});
  }

(cc) And here is the view child example,

On the template HTML side, it looks the same as the local HTML ref example:

    <input
      type="text"
      class="form-control"
      #serverContentInput>

In the TypeScript it looks like this, which in a way looks like a different kind
of databinding, but in this case we are getting a reference to the HTML element:

@ViewChild('serverContentInput') serverContentInput: ElementRef;

The full import statement looks like this:

import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

Here is the listener, but the only code that we are looking at here is the usage of

this.serverContentInput.nativeElement.value

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.bluePrintCreated.emit({name: nameInput.value,
                                content: this.serverContentInput.nativeElement.value});
  }

(ccc) Here is another ViewChild example:

In the template HTML:

<div class="panel-heading" #heading>{{ element.name }}

In the TypeScript:

  @ViewChild('heading') header: ElementRef;

Which can be viewed after the ngAfterViewInit() lifecycle method is called.

console.log(this.header.nativeElement.textContent)

Conclusion to the (aa), (bb) (cc) examples ...

In all cases, the parent component received the data from the emit event like this, which
look like regular event listeners.

  serverElements = [{type: 'server', name: 'TestServer', content: 'Just a test'}];

  onServerAdded(serverData: {name: string, content: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.name,
      content: serverData.content
    });
  }

  onBluePrintAdded(bluePrintData: {name: string, content: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: bluePrintData.name,
      content: bluePrintData.content
    });
  }

  And the code in the parent template HTML to listen for the events from the
  child looks like this:

  <app-cockpit
    (serverCreated)="onServerAdded($event)"
    (bpCreated)="onBluePrintAdded($event)">
  </app-cockpit>

LifeCycle methods
=================

Roughly in order of call order ... Note any of these used must be imported

import { Component, OnChanges, OnInit, etc

  /*
    First lifecycle method. Property values are available when called. This
    will be called when the "bound input" property values change, or those
    values that are tied to @Input.
   */
  ngOnChanges() {

  }

  /* Called when the object is created */
  constructor() { }

  /*
    ngOnInit is the second lifecycle method. When this is called, it does not mean
    the component is visible, the DOM hasn't been rendered yet. When this method is
    called, all properties are available, and note its called after the constructor.
   */
  ngOnInit() {
  }

  /*
    ngDoCheck is the third lifecycle method. It is called a lot. It is called when
    angular believes there has been a change in values or structure of the template
    HTML, or if something needs to change in the template. Clicking buttons, events,
    values, ngFor, ngIf, observables, etc. Can manuallly inform Angular of some change
    it wouldn't know about otherwise.
   */
  ngDoCheck() {

  }

  /*
    Called after content (ng-content) has been projected into child view using
    ng-content
   */
  ngAfterContentInit() {

  }

  /*
    Called every time the projected content has been checked (ie. change detection)
   */
  ngAfterContenChecked() {

  }

  /*
    Called after the component's view and child views have been initialized, For
    example, ViewChild references are valid here but not before.
   */
  ngAfterViewInit() {

  }

  /*
    Called every time the view and child views have been checked
   */
  ngAfterViewChecked() {

  }

  /*
    Called once the copmonent is about to be destroyed
   */
  ngOnDestroy() {
    // cleanup
  }


