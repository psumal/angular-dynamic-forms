import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ButtonItem} from "../../model/item-button";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-button',
  templateUrl: 'button.component.html',
})
export class ButtonComponent {
  config: ButtonItem;
  group: FormGroup;
}
