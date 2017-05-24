import {Injectable, Optional, Inject} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS, FormArray
} from "@angular/forms";
import {AbstractFormControlModel} from "../model/base/form-control";
import {IAbstractFormControlModel} from "../model/item.struckts";
import {ButtonItem} from "../model/item-button";
import {FormGroupItem} from "../model/item-formGroup";
import {TextboxItem} from "../model/item-textbox";
import {SelectItem} from "../model/item-select";
import {CheckboxItem} from "../model/item-checkbox";
import {RadioItem} from "../model/item-radio";
import {TextareaItem} from "../model/item-textarea";
import {CHANGE_SUBSCRIPTIONS, ChangeSubscriptionFn, ChangeSubscriptions} from "../injects/changeSubscriptions";
import {Subscription} from "rxjs/Subscription";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith"

import 'rxjs/Rx'
import {Observable} from "rxjs/Rx";
import {FormatParseFn, FORMATTER_PARSER} from "../injects/formatterParser";


@Injectable()
export class DynamicFormService {

  constructor(private fb: FormBuilder,
              @Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
              @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[],
              @Optional() @Inject(CHANGE_SUBSCRIPTIONS) private CHANGE_SUBSCRIPTIONS: ChangeSubscriptionFn<any>[],
              @Optional() @Inject(FORMATTER_PARSER) private FORMATTER_PARSER: FormatParseFn[]) {
  }

  createFormItem(config: IAbstractFormControlModel): AbstractFormControlModel {
    //prevent side effects
    config= {...config};

    if(!('controlType' in config)) {
      config['controlType'] = guessControlType(config);
    }

    let controlType: string = config['controlType'];
    let item: AbstractFormControlModel  | ButtonItem | FormGroupItem;

    if (controlType === "container") {
      item = config as AbstractFormControlModel;
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

    if(controlType === "formGroup") {
      item = new FormGroupItem(config);
    }

    return item;

    /////////////////////////////

    function guessControlType(struct:IAbstractFormControlModel):string {
      let controlType:string;

      controlType = "container";

      return controlType;

    }
  }
  //@TODO move to utils
  getFormGroupExtras = (formGroupConfig: AbstractFormControlModel) => {

    if(!formGroupConfig) { return null; }

    let fGExtras: any = {};

    if ('validator' in formGroupConfig) {
      const v = formGroupConfig.validator;
      if(Array.isArray(v) && v.length > 0) {
        fGExtras.validator = this.getValidators(v)[0];
      }
    }

    if ('asyncValidator' in formGroupConfig) {
      const av = formGroupConfig.asyncValidator;
      if(Array.isArray(av) && av.length > 0) {
        fGExtras.asyncValidator = this.getAsyncValidators(av)[0];
      }
    }

    return Object.keys(fGExtras).length >=1 ? fGExtras: null;
  };

  getFormControlParamsArray = (item: AbstractFormControlModel): Function[] => {

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
      validator = this.getValidators(item['validator']);
    }
    fCParams.push(validator);

    //async validators
    if ('asyncValidator' in item) {
      asyncValidator = this.getAsyncValidators(item['asyncValidator']);
    }
    fCParams.push(asyncValidator);

    return fCParams;
  };

  getParentForm(group:any):FormGroup|FormArray {
    let parent = group.parent;
    if(parent !== undefined) {
      return this.getParentForm(parent);
    }
    return group;
  }

  addConfigToGroup(group:FormGroup, config:AbstractFormControlModel) {
    console.log('addConfigToGroup', config);
    let configParams:any[] = this.getFormControlParamsArray(config);
    let control:any = (<any>this.fb).control(...configParams);
    group.addControl(config.key, control);
  }

  removeConfigFromGroup(group:FormGroup, config:IAbstractFormControlModel) {
    group.removeControl(config.key);
  }

  getCustomValidatorFn(validatorName: string): ValidatorFn | undefined {
    let validatorFn;

    if (this.NG_VALIDATORS) {
      validatorFn = this.NG_VALIDATORS.find( (validatorFn) => {
        return validatorName === validatorFn.name
      });
    }

    return validatorFn;
  }

  getValidatorFn(validatorName: string, validatorArgs?: any): ValidatorFn {
    if(!validatorName) { return;}
    let validatorFn = Validators[validatorName] || this.getCustomValidatorFn(validatorName);

    if (!(typeof validatorFn === "function")) {
      throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS`);
    }

    return (validatorArgs)?validatorFn(...validatorArgs):validatorFn;
  }

  getValidators(validatorsConfig: any): ValidatorFn[] {
    let validators: any[] = [];

    if (validatorsConfig) {
      validators = validatorsConfig.map((validatorObj: any) => {
        return this.getValidatorFn(validatorObj.name, validatorObj.params)
      })
    }
    return validators;
  }

  getCustomAsyncValidatorFn(validatorName: string, validatorArgs?: any): any {
    let asyncValidatorFn;

    if (this.NG_ASYNC_VALIDATORS) {

      asyncValidatorFn = this.NG_ASYNC_VALIDATORS.find(
        (asyncValidatorFn) => {
          return validatorName === asyncValidatorFn.name
        });
    }

    if (!(typeof asyncValidatorFn === "function")) {
      throw new Error(`validator "${validatorName}" is not provided via NG_ASYNC_VALIDATORS`);
    }

    return (validatorArgs)?asyncValidatorFn(validatorArgs):asyncValidatorFn;
  }

  getChangeSubscriptionFn(subscriptionName: string): ChangeSubscriptionFn<any> | undefined {
    let subscriptionFn;

    if (this.CHANGE_SUBSCRIPTIONS) {
      subscriptionFn = this.CHANGE_SUBSCRIPTIONS.find(subscriptionFn => {
        return subscriptionName === subscriptionFn.name;
      });
    }

    return subscriptionFn;
  }

  getSubscriptionFn(subscriptionName: string): ChangeSubscriptionFn<any> | never {
    let subscriptionFn = ChangeSubscriptions[subscriptionName] || this.getChangeSubscriptionFn(subscriptionName);

    if (!(typeof subscriptionFn === "function")) {
      throw new Error(`Subscription "${subscriptionName}" is not provided via CHANGE_SUBSCRIPTIONS`);
    }

    return subscriptionFn;
  }

  getAsyncValidators(config: any): AsyncValidatorFn[] {
    let asyncValidators: any[] = [];

    if (config) {
      asyncValidators = config.map((validatorObj: any) => {
        return this.getCustomAsyncValidatorFn(validatorObj.name, validatorObj.params)
      })
    }
    return asyncValidators;
  }

  getFormatParseFunction(functionName: string, params: any[]): FormatParseFn | undefined {
    let formatParseFunction: Function;

    if (this.FORMATTER_PARSER) {
      formatParseFunction = this.FORMATTER_PARSER.find(formParsFunc => {
        return functionName === formParsFunc.name;
      });
    } else {
      throw new Error(`No function provided via FORMATTER_PARSER`);
    }

    if (!(typeof formatParseFunction === "function")) {
      throw new Error(`Formatter or Parser with name ${functionName} is not provided via FORMATTER_PARSER.`);
    }

    return (params) ? formatParseFunction(...params) : formatParseFunction;
  }

  initValueChangeSubscriptions(config:IAbstractFormControlModel, group:FormGroup, sideEffect:Function):Subscription[] {
    let subscriptions:Subscription[] = [];

    if ('valueChangeSubscriptions' in config) {
      const listenerConfig = config.valueChangeSubscriptions || [];

      listenerConfig.forEach((listener) => {

        const subscriptionFn: ChangeSubscriptionFn<any> = this.getSubscriptionFn(listener.name);

        let form = this.getParentForm(group);
        let subs = [];
        subs = listener.controls.map(cName => form.get(cName).valueChanges);

        //subscribe to changes
        const initialValues = listener.controls.map(cName => form.get(cName).value);
        const controlChanges$ = Observable.merge(...subs);
        subscriptions.push(
          controlChanges$
            .startWith(...initialValues)
            .subscribe((change: any) => {
              const result = subscriptionFn(change, listener.params, config, group);
              sideEffect({name:listener.name, result:result})
            })
        );
      });
    }

    return subscriptions;
  }

}