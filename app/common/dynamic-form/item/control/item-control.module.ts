import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ItemComponent} from "./item.component";
import {ItemService} from "../../../../component/start/item.service";
import {RadioItem} from "./item-radio";
import {CheckboxItem} from "./item-checkbox";
import {MultiselectItem} from "./item-multiselect";
import {SelectItem} from "./item-select";
import {TextareaItem} from "./item-textarea";
import {TextboxItem} from "./item-textbox";

export { TextboxItem } from "./item-textbox"
export { RadioItem } from "./item-radio"
export { CheckboxItem } from "./item-checkbox"
export { SelectItem } from "./item-select"
export { MultiselectItem } from "./item-multiselect"
export { TextareaItem } from "./item-textarea"

const EXPORTS = [ItemComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [ItemService]
})
export class ItemControlModule {}
