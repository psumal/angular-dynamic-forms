// my-component.component.ts
import {Component, Input, OnInit} from '@angular/core';
import {ItemBase} from "../item/item-base";
import {FormGroup} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'item-errors',
  templateUrl:'./errors.component.html'
})
export class ItemErrorComponent implements OnInit{

  get errors(): {} {
    return this._errors;
  }

  set errors(errors: {}) {
    errors = errors || {};
    this._errors = this._getMessagesByErrors(errors);
  }

  @Input() item: ItemBase<any> = <any>{};
  @Input() form: FormGroup = <any>{};

  private _errors:{};

  errorMessageMap = {
    required:"This value is required!"
  };

  ngOnInit() {
    this.errors = this.form.get(this.item.key).errors;

    let $statusChanges = this.form.get(this.item.key).statusChanges;
    $statusChanges.subscribe((status) => {
      this.errors = this.form.get(this.item.key).errors;
    });
  }

  errorKeys() : Array<string> {
    return Object.keys(this.errors) || [];
  }

  getClassNames() {
    return "form-control-feedback";
  }

  _getMessagesByErrors(errors:{}){
    let mappedErrors = {};
    for (let key of Object.keys(errors)) {
      mappedErrors[key] = this.errorMessageMap[key] || 'No message given for error name '+key;
    }
    return mappedErrors;
  }

}
