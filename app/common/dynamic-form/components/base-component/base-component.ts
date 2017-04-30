import {FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../model/base/form-control";
import {ItemBase} from "../../model/base/item";
import {SubscriptionFn} from "../../../ui-basic/control/control.component";
import {ChangeSubscriptionFn, ChangeSubscriptions} from "../../customSubscriptions/changeSubscriptions";

export class BaseComponent {

  static controlTypes = [];

  CHANGE_SUBSCRIPTIONS:SubscriptionFn[];

  componentRendered: boolean = true;

  config:AbstractFormControlModel<any>;
  group: FormGroup;

  get currentFormItem() {
    return this.group.get(this.config.formPath);
  }

  constructor(CHANGE_SUBSCRIPTIONS) {
    this.CHANGE_SUBSCRIPTIONS = CHANGE_SUBSCRIPTIONS
  }


  getParentFormGroup() {

    let newFormPath: string[] = [...this.config.formPath];
    newFormPath.pop();

    //isRoot
    if (newFormPath.length == 0) {
      return this.group;
    }
    return this.group.get(newFormPath);
  }


  isLabelVisible(): boolean {
    return !!this.config['label'];
  }

  getWrapperClass(): string {

    let classNames: Array<string> = [];
    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames.push('form-check');
    }
    else {
      classNames.push('form-group');
    }

    if (this.currentFormItem.valid) {
      classNames.push('has-success');
    }

    if (!this.currentFormItem.valid) {
      classNames.push('has-danger');
    }

    return classNames.join(' ');

  }

  initSubscriptionFunctions() {
    if (this.config.changeListener) {
      let listener = this.config.changeListener;
      listener.forEach((listener) => {

          let subscriptionFn: ChangeSubscriptionFn<any> = this.getSubscriptionFn(listener.name);

          let otherChanges$ = this.group.get(listener.controls[0]).valueChanges;

          otherChanges$.subscribe(change => {
            if (listener.name === 'isRendered') {
              this.componentRendered = subscriptionFn(change, listener.params, this.config, this.group);
            } else {
              <null>subscriptionFn(change, listener.params, this.config, this.group);
            }

          });

        }
      );
    }
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

  valueChanged(key: string, changes: any, currentValue): boolean {
  if (key in changes) {
    if (changes[key].currentValue !== currentValue) {
      return true;
    }
  }
  return false;
};


}
