import {Injectable}   from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, AsyncValidatorFn, FormBuilder} from '@angular/forms';

import {ItemBase} from '../model/base/item';
import {TextboxItem} from "../model/item-textbox";
import {MultiselectItem} from "../model/item-multiselect";
import {SelectItem} from "../model/item-select";
import {CheckboxItem} from "../model/item-checkbox";
import {RadioItem} from "../model/item-radio";
import {ItemService} from "../../../component/start/item.service";
import {ButtonItem} from "./button/item-button";
import {TextareaItem} from "../model/item-textarea";
import {FormGroupItem} from "./formGroup/formGroup-base";

@Injectable()
export class ItemControlService {

  static createFormGroup(formGroupStruct: {}) {

  }

  static createFormItem(config: {}): ItemBase<any> | FormGroupItem {

    if(!('controlType' in config)) {
      config['controlType'] = guessControlType(config);
    }

    let controlType: string = config['controlType'];
    let item: ItemBase<any> | FormGroupItem;

    if (controlType === "textbox") {
      item = new TextboxItem(config);
    }

    if (controlType === "select") {
      item = new SelectItem(config);
    }

    if (controlType === "multiselect") {
      item = new MultiselectItem(config);
    }

    if (controlType === "checkbox") {
      item = new CheckboxItem(config);
    }

    if (controlType === "radio") {
      item = new RadioItem(config);
    }

    if (controlType === "textarea") {
      item = new TextareaItem(config);
    }

    if (controlType === "button") {
      item = new ButtonItem(config);
    }

    if(controlType === "formGroup") {
      item = new FormGroupItem(config);
    }

    return item;

    /////////////////////////////

    function guessControlType(struct:{}):string {
      let controlType:string;

      controlType = "textbox";

      return controlType;

    }
  }

  static getFormControlParamsArray(struct:{}) {

  }

  constructor() {

  }


}
