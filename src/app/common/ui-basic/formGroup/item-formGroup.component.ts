import {Component, OnInit} from "@angular/core";
import {DynamicFormService} from "../../dynamic-form/services/dynamic-form.service";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  inputs: ['config', 'group'],
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
  providers: [DynamicFormService]
})
export class FormGroupComponent implements OnInit {

  static controlTypes = ["formGroup"];

  private _config: AbstractFormControlModel;
  set config(config: AbstractFormControlModel) {
    this._config = config;
    this.items = config['config'];
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

  private _items: AbstractFormControlModel[] = [];
  set items(value: AbstractFormControlModel[]) {
    this._items = value;
  }

  get items(): AbstractFormControlModel[] {
    return this._items || [];
  }

  get currentFormItem() {
    return this.group.get(this.config.key);
  }

  constructor(protected dfs: DynamicFormService) {

  }

  ngOnInit() {
    console.log('GROUP addConfigToGroup', this.config);
    this.dfs.addConfigToGroup(this.group, this.config);
  }

}
