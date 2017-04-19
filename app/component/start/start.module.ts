import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from "./start.component";

import {StarRatingModule} from "../../common/star-rating/star-rating.module";
import {DynamicFormModule} from "../../common/dynamic-form/dynamic-form.module";
import {ItemService} from "./item.service";
import {TemplateFormModule} from "../../common/template-form/template-form.module";
import {RecurseModule} from "./recurse/recurse.module";
import {DFModule} from "../../common/df/df-form.module";
import {InjectComponent} from "./inject-component/inject-component.component";
import {RecurseComponent} from "./recurse/recurse.component";
import {DFFormGroupComp} from "../../common/df/df-fg/df-form-group.component";
import {ControlComponent} from "../../common/dynamic-form/item/control/control.component";
import {ReactiveFormsModule} from "@angular/forms";



export{ StartComponent} from "./start.component";

const EXPORTS = [ StartComponent, InjectComponent ];

@NgModule({
  imports: [ CommonModule, StarRatingModule,ReactiveFormsModule, TemplateFormModule, RecurseModule,
    DFModule,
    DynamicFormModule.withComponents([DFFormGroupComp, ControlComponent]),
    DFModule.withComponents([
      InjectComponent,
      RecurseComponent
    ])],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
  providers: [ ItemService]
})
export class StartModule { }

