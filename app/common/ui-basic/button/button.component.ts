import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ButtonItem} from "../../dynamic-form/model/item-button";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-button',
  templateUrl: 'button.component.html',
})
export class ButtonComponent {
  static controlTypes = ["button", "submit", "reset"];

  config: ButtonItem;
  group: FormGroup;
}
