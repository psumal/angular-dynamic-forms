import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {IDynamicFormElementModel} from "../../../dymanic-form-element/model/base/form-control-options";

@Component({
  inputs: ['config', 'group'],
  selector: 'df-slider',
  templateUrl: './slider.component.html',
})
export class SliderComponent {
  static controlTypes = ['slider'];
  config: IDynamicFormElementModel;
  group: FormGroup;
}
