import {Component} from "@angular/core";
import {FormConfigService} from "./form-config.service";
import {FormGroup} from "@angular/forms";
import {FormGroupItem} from "../../common/dynamic-form/model/item-formGroup";
import {DynamicFormUtils} from "../../common/dynamic-form/services/dynamic-form.utils";

@Component({
  moduleId: module.id,
  selector: 'start',
  templateUrl: 'start.component.html',
})
export class StartComponent {

  constructor() { }

}
