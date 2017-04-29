import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ItemBase} from "../../dynamic-form/model/base/item";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-slider',
  templateUrl: 'slider.component.html',
})
export class SliderComponent {
  config: ItemBase;
  group: FormGroup;
}
