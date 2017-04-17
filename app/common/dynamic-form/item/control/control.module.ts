import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ControlComponent} from "./control.component";
import {ItemService} from "../../../../component/start/item.service";
import {RadioItem} from "../../model/item-radio";
import {CheckboxItem} from "../../model/item-checkbox";
import {MultiselectItem} from "../../model/item-multiselect";
import {SelectItem} from "../../model/item-select";
import {TextareaItem} from "../../model/item-textarea";
import {TextboxItem} from "../../model/item-textbox";

export { TextboxItem } from "../../model/item-textbox"
export { RadioItem } from "../../model/item-radio"
export { CheckboxItem } from "../../model/item-checkbox"
export { SelectItem } from "../../model/item-select"
export { MultiselectItem } from "../../model/item-multiselect"
export { TextareaItem } from "../../model/item-textarea"

const EXPORTS = [ControlComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [ItemService]
})
export class ItemControlModule {}
