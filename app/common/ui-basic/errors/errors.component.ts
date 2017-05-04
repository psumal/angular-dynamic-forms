import {Component, OnInit, OnDestroy} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";
import {ErrorService} from "../../dynamic-form/services/error.service";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'item-errors',
  templateUrl:'errors.component.html'
})
export class ControlErrorComponent implements OnInit, OnDestroy {

  config: AbstractFormControlModel<any> = <any>{};
  group: FormGroup = <any>{};

  protected errorService:ErrorService;

  errorMessages:{};

  private _errors:{[key:string]:string} = {};

  get errors(): {[key:string]:string} {
    return this._errors;
  }

  set errors(errors: {[key:string]:string}) {
    errors = errors || {};
    this._errors = errors;
    this.errorMessages = this.errorService.getErrorMsgByErrors(errors, this.config, this.group);
  }

  subscriptions:any[] = [];

  constructor(errorService:ErrorService) {
    this.errorService = errorService;
  }

  ngOnInit() {
    this.updateErrors();

    if(this.group && 'statusChanges' in this.group) {
      let sub = this.group.statusChanges
        .subscribe((status) => {
          this.updateErrors();
        });
      this.subscriptions.push(sub);
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      try{
        subscription.unsubscribe();
      } catch(e) {}
    })
  }


  updateErrors() {

    this.errors = this.errorService.getErrors(this.group);
  }

  errorKeys() : Array<string> {
    return Object.keys(this.errors) || [];
  }

  errorVisible() {
    return this.group.invalid && (this.group.touched && this.group.dirty);
  }

  getClassNames():string {
    return "form-control-feedback";
  }

}
