import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";
import {BaseComponent} from "../../dynamic-form/components/base-component/base-component";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'item-errors',
  templateUrl:'errors.component.html'
})
export class ControlErrorComponent implements OnInit {

  config: AbstractFormControlModel<any> = <any>{};
  group: FormGroup = <any>{};

  private _errors:{[key:string]:string} = {};

  errorMessageMap = {
    required:"This value is required!"
  };

  errorMessages:{};

  get errors(): {} {
    return this._errors;
  }

  set errors(errors: {}) {
    errors = errors || {};
    this._errors = errors;
    this.errorMessages = this._getMessagesByErrors(this._errors);
  }


  ngOnInit() {
    this.errors = this._getErrors(this.config.formPath);
    let $statusChanges = this.group.get(this.config.formPath).statusChanges;
    $statusChanges.subscribe((status) => {
      this.errors = this._getErrors(this.config.formPath);
    });
  }

  _getErrors(formControlName:string | string[]) : {[key:string]:string} {
    let errors = {};
    let item = this.group.get(formControlName);
    return (item && 'errors' in item)?item.errors:{};
  }

  errorKeys() : Array<string> {
    return Object.keys(this.errors) || [];
  }

  getClassNames():string {
    return "form-control-feedback";
  }

  _getMessagesByErrors(errors:{}):{}{
    let mappedErrors = {};
    for (let validatorName of this.errorKeys()) {
      //@TODO implement placeholder for:
      // currentValue,
      const curVal = this.group.get(this.config.formPath).value
      // field laben,
      const label = this.config.label;

      // validation name

      // validation params
      //console.log('Validator Params: ', this.config.validator.find( (i) => i.name == key).params );

      let errorMessage = `No message given for validator ${validatorName} on field ${label}`;

      mappedErrors[validatorName] = this.errorMessageMap[validatorName];
    }
    return mappedErrors;
  }

}
