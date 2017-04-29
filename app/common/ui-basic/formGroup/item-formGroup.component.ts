import {Component} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {FormGroupItem} from "../../dynamic-form/model/item-formGroup";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
})
export class FormGroupComponent {

  static controlTypes = ["formGroup"];

  config:FormGroupItem;
  group: FormGroup;

  getFormGroupClass(): string {
    let classNames: Array<string> = [];
    classNames.push('');
    return classNames.join(' ');
  }



}
