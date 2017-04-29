import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ItemBase} from "../../../../common/dynamic-form/model/base/item";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-slider',
  templateUrl: 'slider.component.html',
})
export class SliderComponent {
  static controlTypes = ['slider'];
  config: ItemBase;
  group: FormGroup;
}
