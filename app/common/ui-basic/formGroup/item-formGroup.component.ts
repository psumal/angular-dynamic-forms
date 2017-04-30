import {Component, SimpleChange, SimpleChanges} from '@angular/core';
import {FormGroup, FormBuilder}        from '@angular/forms';
import {DynamicFormUtils} from "../../dynamic-form/services/dynamic-form.utils";
import {DynamicFormComponent} from "../../dynamic-form/containers/dynamic-form.component";
import {DynamicFormService} from "../../dynamic-form/services/dynamic-form.service";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
  providers: [DynamicFormUtils, DynamicFormService]
})
export class FormGroupComponent {

  static controlTypes = ["formGroup"];

  getFormGroupClass(): string {
    let classNames: Array<string> = [];
    classNames.push('');
    return classNames.join(' ');
  }

  group: FormGroup;

  _items: AbstractFormControlModel<any>[]= [];

  set items(value:any[]) {
    this._items = value
      .map((item: any) => {
        console.log('item: ', item);
        let newItem = DynamicFormUtils.createFormItem(item);
        if (newItem) {
          return newItem;
        }
      });

  }

  get items() : any[] {
    return this._items;
  }

  private _config: AbstractFormControlModel<any>;

  set config(config: AbstractFormControlModel<any>) {

    this._config = config;
    this.items = config['config'];

  }

  get config(): AbstractFormControlModel<any> {
    return this._config;
  }

  constructor() {}

  getParentFormGroup() {

    let newFormPath:string[] = [...this.config.formPath];
    newFormPath.pop();

    //isRoot
    if(newFormPath.length == 0) {
      console.log('newFormPath:: is group');
      return this.group;
    }
    console.log('newFormPath:: ', newFormPath);
    return this.group.get(newFormPath);
  }

  get currentFormItem() {
    return this.group.get(this.config.formPath);
  }

  ngOnChanges(changes: SimpleChanges): void {

    let valueChanged = function (key: string, changes: SimpleChanges): boolean {
      if (key in changes) {
        if (changes[key].currentValue !== changes[key].previousValue) {
          return true;
        }
      }
      return false;
    };

    //---------------------------------------

    if (valueChanged('group', changes)) {
      this.group = changes['group'].currentValue || {};
    }

    if (valueChanged('config',changes)) {
      this.config = changes['config'].currentValue || [];
    }

  }


}