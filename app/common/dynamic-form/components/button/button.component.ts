import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import {ButtonItem} from "../../model/item-button";

@Component({
  moduleId: module.id,
  selector: 'df-button',
  templateUrl: 'button.component.html',
})
export class ButtonComponent {
  @Input() config: ButtonItem;
  @Input() form: FormGroup;

}
