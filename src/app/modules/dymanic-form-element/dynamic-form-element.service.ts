import {Inject, Injectable, Optional} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

import {UI_COMPONENTS} from "./dynamic-form-element.injectonToken";
import {DynamicFormElementModel} from "./model/base/form-control";
import {ButtonItem} from "./model/item-button";
import {TextboxItem} from "./model/item-textbox";
import {SelectItem} from "./model/item-select";
import {CheckboxItem} from "./model/item-checkbox";
import {RadioItem} from "./model/item-radio";
import {TextareaItem} from "./model/item-textarea";
import {FormGroupItem} from "./model/item-formGroup";
import {ValidationService} from "../validation-utils/validation.service";
import {IDynamicFormElementModel} from "./model/base/form-control-options";

@Injectable()
export class DynamicFormElementService {

  constructor(private fb: FormBuilder,
              private vs: ValidationService,
              @Optional() @Inject(UI_COMPONENTS) private UI_COMPONENTS: Function[]) {

  }

  getComponent(componentName: string): any | undefined {
    let component;

    if (this.UI_COMPONENTS) {
      component = this.UI_COMPONENTS.find(component => {
        let isComponent = false;

        //custom identifier
        if ('controlTypes' in component) {
          isComponent = component['controlTypes'].indexOf(componentName) !== -1;
        }
        else {
          throw new Error(`component: ${component.name} has no custom identifier`);
        }

        return (isComponent) ? isComponent : componentName === component.name;
      });
    } else {
      throw new Error(`No Components provided via UI_COMPONENTS. Import a ui bundle`);
    }

    if (!(typeof component === "function")) {
      throw new Error(`Component "${component}" with name ${componentName} is not provided via UI_COMPONENTS. Maybe your controlType is not present in controlTypes in any component?`);
    }

    return component;

  }

  createFormItem(config: IDynamicFormElementModel): DynamicFormElementModel {
    //prevent side effects
    config = {...config};

    if (!('controlType' in config)) {
      config['controlType'] = guessControlType(config);
    }

    let controlType: string = config['controlType'];
    let item: DynamicFormElementModel | ButtonItem | FormGroupItem;

    if (controlType === "container") {
      item = config as DynamicFormElementModel;
    }

    if (controlType === "textbox") {
      item = new TextboxItem(config);
    }

    if (controlType === "select") {
      item = new SelectItem(config);
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

    if (controlType === "formGroup") {
      item = new FormGroupItem(config);
    }

    return item;

    /////////////////////////////

    function guessControlType(struct: IDynamicFormElementModel): string {
      let controlType: string;

      controlType = "container";

      return controlType;

    }
  }

  //@TODO move to utils
  getFormGroupExtras = (formGroupConfig: IDynamicFormElementModel) => {

    if (!formGroupConfig) {
      return null;
    }

    let fGExtras: any = {};

    if ('validator' in formGroupConfig) {
      const v = formGroupConfig.validator;
      if (Array.isArray(v) && v.length > 0) {
        fGExtras.validator = this.vs.getValidators(v)[0];
      }
    }

    if ('asyncValidator' in formGroupConfig) {
      const av = formGroupConfig.asyncValidator;
      if (Array.isArray(av) && av.length > 0) {
        fGExtras.asyncValidator = this.vs.getAsyncValidators(av)[0];
      }
    }

    return Object.keys(fGExtras).length >= 1 ? fGExtras : null;
  };

  getFormControlParamsArray = (item: IDynamicFormElementModel): Function[] => {

    let fCParams: any[] = [];

    let formState: any = '';
    let validator: Function[] = [];
    let asyncValidator: Function[] = [];


    //form state
    if (item['formState'] !== undefined) {
      formState = item['formState'];
    }
    fCParams.push(formState);

    //validators
    if (item['validator'] !== undefined && item['validator'].length > 0) {
      validator = this.vs.getValidators(item['validator']);
    }
    fCParams.push(validator);

    //async validators
    if ('asyncValidator' in item) {
      asyncValidator = this.vs.getAsyncValidators(item['asyncValidator']);
    }
    fCParams.push(asyncValidator);

    return fCParams;
  };

  addControlConfigToGroup(group: FormGroup, config: IDynamicFormElementModel) {
    let configParams: any[] = this.getFormControlParamsArray(config);
    let control: any = (<any>this.fb).control(...configParams);
    group.addControl(config.key, control);
  }

  addGroupConfigToGroup(group: FormGroup, config: IDynamicFormElementModel) {
    let extras: any[] = this.getFormGroupExtras(config);
    let control: any = (<any>this.fb).group({},extras);
    group.addControl(config.key, control);
  }

  removeConfigFromGroup(group: FormGroup, config: IDynamicFormElementModel) {
    group.removeControl(config.key);
  }

}
