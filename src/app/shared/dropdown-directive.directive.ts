import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective {
  /*
   * The purpose of this CSS is to add CSS to the element
   * the directive is added to when that element is clicked
   * And toggled when clicked again.
   *
   * In our case, it will be used in the recipe-detail component
   * on the dropdown down button, to open the menu when the
   * button is clicked.
   *
   * Basically anywhere there is a dropdown, it will dynamically
   * apply (or toggle) the "open" class.
   */

   // Attach to the "open" class (which is bootstrap)
  @HostBinding('class.open')
  isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
