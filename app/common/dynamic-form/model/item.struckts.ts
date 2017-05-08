import {ValidatorFn, AsyncValidatorFn} from '@angular/forms';

export interface changeListenerParamsConfig {
  key:string;
  optionsKeys: string[];
}

export interface IChangeListenerConfig {
  name:string;
  controls: string[];
  params: changeListenerParamsConfig[];
}

export interface IValidatorConfig {
  name:string;
  params: any[];
}

export interface ISelectOption {
    label: string;
    value?: any;
    disabled?: boolean;
    options?: ISelectOption[]
}

export interface IAbstractFormControlModel {
  parentId?: string;
  key?: string;
  formPath?: string[];
  controlType?: string;
  config?: IAbstractFormControlModel[];
  inputType?: string;
  placeholder?:string;

  options?:ISelectOption[];
  noOptKey?:string;
  multiple?:boolean;

  formState?: any;
  disabled?: boolean;

  validator?: IValidatorConfig[];
  asyncValidator?: IValidatorConfig[];
  validatorMessages?: {[validationName:string]:string};
  formatterParser?: any[];
  changeListener?: IChangeListenerConfig[];

  label?: string;
  helpText?:string;
  attrs?: {[attr:string]:string}[];
  controlClass?: string[];
  wrapperClass?: string[];
}


export type controlTypes =  'textbox' | 'select' | 'checkbox'| 'radio'| 'textarea'| 'button' | 'formGroup' | 'formArray' | 'container';

//checkbox color file image radio reset submit
export type textboxTypes = 'text' | 'number' | 'email' | 'tel' | 'password' | 'date' | 'time' | 'datetime-local' | 'week' | 'month' | 'url' | 'hidden' | 'range' | 'search' | 'file';

//button checkbox color file image radio reset submit
export type buttonTypes = 'button' | 'submit' | 'reset';

//button checkbox color file image radio reset submit
export type inputTypes =  'text' | 'number' | 'email' | 'tel' | 'password' | 'date' | 'time' | 'datetime-local' | 'week' | 'month' | 'url' | 'hidden' | 'range' | 'search'| 'radio' | 'checkbox' | 'button' | 'submit' | 'reset';
