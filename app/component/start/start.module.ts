import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from "./start.component";

import {StarRatingModule} from "../../common/star-rating/star-rating.module";
import {DynamicFormModule} from "../../common/dynamic-form/dynamic-form.module";
import {ItemService} from "./item.service";
import {TemplateFormModule} from "../../common/template-form/template-form.module";
import {RecurseModule} from "./recurse/recurse.module";
import {CustomSubscriptionsModule} from "./customSubscriptions/customSubscriptions.module";


export{ StartComponent} from "./start.component";

const EXPORTS = [ StartComponent ];

@NgModule({
  imports: [ CommonModule, StarRatingModule, DynamicFormModule, TemplateFormModule, RecurseModule, CustomSubscriptionsModule],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
  providers: [ ItemService]
})
export class StartModule { }
