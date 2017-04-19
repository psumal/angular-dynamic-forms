import {Component, Input, Optional, Inject} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../model/base/form-control";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import {CUSTOM_SUBSCRIPTIONS} from "../../customSubscriptions/customSubscriptions.module";

export interface SubscriptionFn {
  (): any;
}

@Component({
  moduleId: module.id,
  selector: 'df-item',
  templateUrl: 'control.component.html',
})
export class ControlComponent {
  @Input() config: AbstractFormControlModel<any> = <any>{};
  @Input() form: FormGroup = <any>{};

  controlRendered: boolean = true;

  constructor(@Optional() @Inject(CUSTOM_SUBSCRIPTIONS) private CUSTOM_SUBSCRIPTIONS: SubscriptionFn[]) {
    console.log('this.CUSTOM_SUBSCRIPTIONS', this.CUSTOM_SUBSCRIPTIONS);
  }

  ngOnInit() {

    if (this.config.changeListener) {
      let listener = this.config.changeListener;
      listener.forEach((listener) => {

          listener.cb = this.getCustomSubscriptionFn(listener.name);

        this.getSubscriptionFn(listener.name);

        console.log('listener:  ', listener);
          let otherChanges$ = this.form.get(listener.controls[0]).valueChanges;

          otherChanges$.subscribe(change => {

            this.controlRendered = listener.cb(change, listener.params, this.config, this.form);
            if (listener.name === 'subscribeControlRendered') {

            } else {
              //listener.cb(change, listener.params, this.config, this.form);
            }

          });

        /*
         let controlsValueChanges = [];
         for (let i = 0; i < listener.controls.length; i++) {
         console.log('add valueChanges to array: ', listener.controls[i]);
         controlsValueChanges.push(this.form.get(listener.controls[i]).valueChanges);
         }

         let controlsValueChanges$ = new Observable().merge(controlsValueChanges);

         controlsValueChanges$
         .subscribe(change => {
         console.log('formValueChanges$', change);
         console.log('listener.name', listener.name);
         if (listener.name === 'controlRendered') {
         this.controlRendered = listener.cb(change, listener.params, this.config, this.form);
         } else {
         listener.cb(change, listener.params, this.config, this.form);
         }
         });

         */

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

    if (this.form.get(this.config.key).valid) {
      classNames.push('has-success');
    }

    /*if(displayWarning()) {
     classNames.push('has-warning');
     }*/

    if (!this.form.get(this.config.key).valid) {
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

  isError() {
    return true;
  }

  getCustomSubscriptionFn(subscriptionName: string): SubscriptionFn | undefined {
    let subscriptionFn;

    console.log('this.CUSTOM_SUBSCRIPTIONS: ', this.CUSTOM_SUBSCRIPTIONS);

      if (this.CUSTOM_SUBSCRIPTIONS) {

        subscriptionFn = this.CUSTOM_SUBSCRIPTIONS.find(subscriptionFn => {
          console.log('find subscriptionFn.name: ', subscriptionFn.name);
          return subscriptionName === subscriptionFn.name;
        });

      }

    return subscriptionFn;
  }

  getSubscriptionFn(subscriptionName: string): SubscriptionFn | never {
    console.log('getSubscriptionFn name: ', subscriptionName);
    let validatorFn = this.getCustomSubscriptionFn(subscriptionName);

    if (!(typeof validatorFn === "function")) {
      throw new Error(`subscription "${subscriptionName}" is not provided via CUSTOM_SUBSCRIPTIONS`);
    }

    return validatorFn;
  }


}
