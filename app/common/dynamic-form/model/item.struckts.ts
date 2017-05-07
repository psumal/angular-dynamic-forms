import {ValidatorFn, AsyncValidatorFn} from "@angular/forms";
export interface changeListenerConfig {
  name:string;
  controls: string[];
  params: changeListenerParamsConfig[];
}

export interface changeListenerParamsConfig {
  key:string;
  optionsKeys: string[];
}

export interface IItemBaseOptions {
  key?: string,
  formPath?:string[],
  disabled?: boolean,
  parentId?:string;
  order?: number,
  controlType?: string
}

export interface IAbstractControlOptions extends IItemBaseOptions{
  label?:string,
  attrs?:any;
  controlClass?:string[];
  wrapperClass?:string[];

  required?: boolean,
  formState?:any,
  validator?:ValidatorFn | ValidatorFn[],
  asyncValidator?:AsyncValidatorFn | AsyncValidatorFn[],

  validatorMessages?:any,
  formatterParser?:any[],
  changeListener?:changeListenerConfig[];
}

export type controlTypes =  'textbox' | 'select'| 'multiselect'| 'checkbox'| 'checkboxInline'| 'radioInline'| 'textarea'| 'button' | 'formGroup' | 'formArray' | 'row';

//checkbox color file image radio reset submit
export type textboxTypes = "text" | "number" | "email" | "tel" | "password" | "date" | "time" | "datetime-local" | "week" | "month" | "url" | "hidden" | "range" | "search";

//button checkbox color file image radio reset submit
export type buttonTypes = "button" | "submit" | "reset";

//button checkbox color file image radio reset submit
export type inputTypes =  "text" | "number" | "email" | "tel" | "password" | "date" | "time" | "datetime-local" | "week" | "month" | "url" | "hidden" | "range" | "search"
                        | "button" | "submit" | "reset";
