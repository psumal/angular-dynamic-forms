import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'twb-row',
  templateUrl: 'container.component.html',
})
export class ContainerComponent {
  static controlTypes = ["container"];

  private _config: AbstractFormControlModel;
  set config(config: AbstractFormControlModel) {
    this._config = config;
  }

  get config(): AbstractFormControlModel {
    return this._config;
  }

  private _group: FormGroup;
  set group(group: FormGroup) {
    this._group = group;
  }

  get group(): FormGroup {
    return this._group;
  }

  constructor() {

  }

}
