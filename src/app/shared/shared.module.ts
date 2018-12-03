import { NgModule } from '@angular/core';
import { DropDownCutomDirective } from './custom-directives/dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DropDownCutomDirective
    ],
    imports: [],
    exports: [
        CommonModule,
        DropDownCutomDirective // making this directive accessable to other modules
    ],
    providers: [],
})
export class SharedModule { }
