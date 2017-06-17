import {DynamicFormElementModel} from "./base/form-control";
import {IDynamicFormElementModel} from "./base/form-control-options";

export class FormArrayItem extends DynamicFormElementModel {

  controlType: string = 'formArray';
  numOfRows?:number;

  constructor(options: IDynamicFormElementModel) {
    super(options);
    this.numOfRows = options.numOfRows || 0;
  }

}
