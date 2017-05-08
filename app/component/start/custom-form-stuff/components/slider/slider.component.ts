import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {IAbstractFormControlModel} from "../../../../../common/dynamic-form/model/item.struckts";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-slider',
  templateUrl: 'slider.component.html',
})
export class SliderComponent {
  static controlTypes = ['slider'];
  config: IAbstractFormControlModel;
  group: FormGroup;
}
