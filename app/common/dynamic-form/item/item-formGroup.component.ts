import {Component, Input} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {ItemBase}     from './item-base';
@Component({
  moduleId: module.id,
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
})
export class FormGroupComponent {
  //@Input() formGroup: Array<ItemBase<any>>;
  //@Input() form: FormGroup;

  getFormGroupClass(): string {

    let classNames: Array<string> = [];

    classNames.push('');

    return classNames.join(' ');
  }

}
