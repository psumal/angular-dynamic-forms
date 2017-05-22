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


  private _config: ButtonItem;
  set config(config: ButtonItem) {
    this._config = config;
  }

  get config(): ButtonItem {
    return this._config;
  }

  private _group: FormGroup;
  set group(group: FormGroup) {
    this._group = group;
  }

  get group(): FormGroup {
    return this._group;
  }

}
