import {Component, OnDestroy, OnInit} from "@angular/core";
import {DynamicFormElementService} from "../../dymanic-form-element/dynamic-form-element.service";
import {IDynamicFormElementModel} from "../../dymanic-form-element/model/base/form-control-options";
import {FormGroup} from "@angular/forms";

@Component({
  inputs: ['config', 'group'],
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
  providers: [DynamicFormElementService]
})
export class FormGroupComponent implements OnInit, OnDestroy {

  static controlTypes = ["formGroup"];

  private _config: IDynamicFormElementModel;
  set config(config: IDynamicFormElementModel) {
    this._config = config;
    this.items = config.config;
  }

  get config(): IDynamicFormElementModel {
    return this._config;
  }

  private _group: FormGroup;
  set group(group: FormGroup) {
    this._group = group;
  }

  get group(): FormGroup {
    return this._group;
  }

  private _items: IDynamicFormElementModel[] = [];
  set items(value: IDynamicFormElementModel[]) {
    this._items = value;
  }

  get items(): IDynamicFormElementModel[] {
    return this._items || [];
  }

  get currentFormItem() {
    return this.group.get(this.config.key);
  }

  constructor(protected dfes: DynamicFormElementService) {

  }

  ngOnInit() {
    this.dfes.addConfigToGroup(this.group, this.config);
  }

  ngOnDestroy() {
    this.dfes.removeConfigFromGroup(this.group, this.config);
  }

}
