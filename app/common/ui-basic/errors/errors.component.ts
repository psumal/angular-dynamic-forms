import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'item-errors',
  templateUrl:'errors.component.html'
})
export class ControlErrorComponent implements OnInit{

  @Input() config: AbstractFormControlModel<any> = <any>{};
  @Input() group: FormGroup = <any>{};

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
    this.errors = this._getErrors(this.config.key);

    let $statusChanges = this.group.get(this.config.key).statusChanges;
    $statusChanges.subscribe((status) => {
      this.errors = this._getErrors(this.config.key);
    });
  }

  _getErrors(formControlName:string) : {[key:string]:string} {
    let errors = {};
    let item = this.group.get(this.config.key);
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
    for (let key of this.errorKeys()) {
      mappedErrors[key] = this.errorMessageMap[key] || 'No message given for error name '+key;
    }
    return mappedErrors;
  }

}
