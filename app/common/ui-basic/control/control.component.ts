import {Component, Input, Optional, Inject} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import {CHANGE_SUBSCRIPTIONS} from "../../dynamic-form/customSubscriptions/changeSubscriptions";
import {
  ChangeSubscriptionFn, ChangeSubscriptions
} from "../../dynamic-form/customSubscriptions/changeSubscriptions";

export interface SubscriptionFn {
  (): any;
}

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-item',
  templateUrl: 'control.component.html',
})
export class ControlComponent {

  static controlTypes = ["select", "checkbox", "radio", "textbox", "textarea"];

  config: AbstractFormControlModel<any> = <any>{};
  group: FormGroup = <any>{};

  controlRendered:boolean = true;

  constructor(@Optional() @Inject(CHANGE_SUBSCRIPTIONS) private CHANGE_SUBSCRIPTIONS: SubscriptionFn[]) {

  }

  ngOnInit() {

    if (this.config.changeListener) {
      let listener = this.config.changeListener;
      listener.forEach((listener) => {

          let subscriptionFn:ChangeSubscriptionFn<any> = this.getSubscriptionFn(listener.name);

          let otherChanges$ = this.group.get(listener.controls[0]).valueChanges;

          otherChanges$.subscribe(change => {
            if (listener.name === 'isRendered') {
              this.controlRendered = subscriptionFn(change, listener.params, this.config, this.group);
            } else {
              <null>subscriptionFn(change, listener.params, this.config, this.group);
            }

          });

        }
      );
    }
  }

  init() {
    //setup controlRendered subscriptions
  }

  isLabelVisible(): boolean {
    return !!this.config['label'];
  }

  getWrapperClass(): string {
    /*let displayWarning = function() => {
     return this.item.value !== 'te';
     };*/

    let classNames: Array<string> = [];
    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames.push('form-check');
    }
    else {
      classNames.push('form-group');
    }

    if (this.group.get(this.config.key).valid) {
      classNames.push('has-success');
    }

    /*if(displayWarning()) {
     classNames.push('has-warning');
     }*/

    if (!this.group.get(this.config.key).valid) {
      classNames.push('has-danger');
    }

    return classNames.join(' ');

  }

  isControlTypeVisible(controlType: string): boolean {
    return this.config.controlType === controlType;
  }

  getControlClass(): string {
    let classNames: string = "";
    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames = 'form-check-input';
    }
    else {
      classNames = 'form-control';
    }
    return classNames;
  }

  getCustomSubscriptionFn(subscriptionName: string): SubscriptionFn | undefined {
    let subscriptionFn;

    if (this.CHANGE_SUBSCRIPTIONS) {

        subscriptionFn = this.CHANGE_SUBSCRIPTIONS.find(subscriptionFn => {
          console.log('subscriptionFn: ', subscriptionFn);
          return subscriptionName === subscriptionFn.name;
        });

      }

    return subscriptionFn;
  }

  getSubscriptionFn(subscriptionName: string): ChangeSubscriptionFn<any> | never {
    let subscriptionFn = ChangeSubscriptions[subscriptionName] || this.getCustomSubscriptionFn(subscriptionName);

    if (!(typeof subscriptionFn === "function")) {
      throw new Error(`validator "${subscriptionName}" is not provided via CHANGE_SUBSCRIPTIONS`);
    }

    return subscriptionFn;
  }


}
