import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractFormControlModel} from "./item.struckts";

export class FormGroupItem extends AbstractFormControlModel {

  controlType:string = 'formGroup';

  constructor(options:IAbstractFormControlModel = {}) {
   super(options);
  }

}
