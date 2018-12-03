import { Directive, HostBinding, Input, HostListener } from '@angular/core';

@Directive({ selector: '[appDropDownCustomeDirective]' })
export class DropDownCutomDirective {

    constructor() { }
    // This customdirective -> will add css class when an btn event is triggered
    // and remove the css class when btn event is triggered again

    // we will be targeting open css class which is provided by bootstrap
    // i.e -> on click of btn (Event is triggered) we need to append 'open' css class to element,
    // on another click of btn we need to remove the 'open' css which we had appended previously

    @HostBinding('class.open') isOpen = false; // class is css class array

    @HostListener('click') myToggleOpen(event: Event) {
        this.isOpen = !this.isOpen;
    }


}
