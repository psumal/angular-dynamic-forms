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
  formPath?:string[];
  parentId?:string;
  order?: number,
  controlType?: string
}

export interface IAbstractControlOptions<T> extends IItemBaseOptions{
  value?: T,
  label?:string,
  required?: boolean,
  validator?:ValidatorFn | ValidatorFn[],
  asyncValidator?:AsyncValidatorFn | AsyncValidatorFn[],
  changeListener?:changeListenerConfig[]
}

//checkbox color file image radio reset submit
export type textboxTypes = "text" | "number" | "email" | "tel" | "password" | "date" | "time" | "datetime-local" | "week" | "month" | "url" | "hidden" | "range" | "search";

//button checkbox color file image radio reset submit
export type buttonTypes = "button" | "submit" | "reset";
