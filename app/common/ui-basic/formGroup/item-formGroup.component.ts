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
  declarations: [FormGroupComponent]
})
export class FormGroupComponent {

  static controlTypes = ["formGroup"];

  getFormGroupClass(): string {
    let classNames: Array<string> = [];
    classNames.push('');
    return classNames.join(' ');
  }

  group: FormGroup;

  items;

  private _config: AbstractFormControlModel<any>[] = [];
  set config(config: Array<any>) {
    console.log('configconfigconfig', config);

    this._config = config;

    this.items = (<any>config['config'])
      .map((item: any) => {

        let newItem = DynamicFormUtils.createFormItem(item);
        if (newItem) {
          return newItem;
        }
    });
  }

  get config(): Array<any> {
    return this._config;
  }

  constructor(protected dfService: DynamicFormService, protected fb:FormBuilder) {}

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

  protected renderForm(): void {
    this.group = this.fb.group(this.items);
  }

}
