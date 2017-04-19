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
  key: string,
  order?: number,
  controlType?: string
}

export interface IAbstractControlOptions<T> extends IItemBaseOptions{
  value?: T,
  required?: boolean,
  validator?:ValidatorFn | ValidatorFn[],
  asyncValidator?:AsyncValidatorFn | AsyncValidatorFn[],
  changeListener?:changeListenerConfig[]
}

//button checkbox color file image radio reset submit
export type textboxTypes = "text" | "number" | "email" | "tel" | "password" | "date" | "time" | "datetime-local" | "week" | "month" | "url" | "hidden" | "range" | "search";
