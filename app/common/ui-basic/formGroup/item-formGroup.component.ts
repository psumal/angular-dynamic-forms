import {Component} from '@angular/core';
import {DynamicFormUtils} from "../../dynamic-form/services/dynamic-form.utils";
import {DynamicFormService} from "../../dynamic-form/services/dynamic-form.service";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";
import {BaseComponent} from "../../dynamic-form/components/base-component/base-component";
import {FormGroup} from "@angular/forms";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
  providers: [DynamicFormUtils, DynamicFormService]
})
export class FormGroupComponent extends BaseComponent {

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

  private _items: AbstractFormControlModel[]= [];
  set items(value:any[]) {
    this._items = value
      .map((item: any) => {

        let newItem = DynamicFormUtils.createFormItem(item);
        if (newItem) {
          return newItem;
        }
      });

  }

  get items() : any[] {
    return this._items;
  }

  constructor() {
    super();
  }

}
