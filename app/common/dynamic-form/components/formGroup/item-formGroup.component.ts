import {Component, Input} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {FormGroupItem} from "../../model/item-formGroup";

@Component({
  moduleId: module.id,
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
})
export class FormGroupComponent {
  @Input() config:FormGroupItem;
  @Input() form: FormGroup;

  getFormGroupClass(): string {
    let classNames: Array<string> = [];
    classNames.push('');
    return classNames.join(' ');
  }



}
