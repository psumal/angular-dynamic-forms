import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import {AbstractFormControlModel} from "../../model/base/form-control";
@Component({
  moduleId: module.id,
  selector: 'df-button',
  templateUrl: 'button.component.html',
})
export class ButtonComponent {
  @Input() config: AbstractFormControlModel<any>;
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.config.key].valid; }
}
