import {FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../model/base/form-control";

export class BaseComponent {

  static controlTypes: string[] = [];

  CHANGE_SUBSCRIPTIONS: any[];

  componentRendered: boolean = true;

  config: any;
  group: FormGroup;

  get currentFormItem() {
    return this.group.get(this.config.formPath);
  }

  constructor(CHANGE_SUBSCRIPTIONS?: any[]) {
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

  isControlTypeVisible(controlType: string): boolean {
    return this.config.controlType === controlType;
  }

  valueChanged(key: string, changes: any, currentValue: any): boolean {
    if (key in changes) {
      if (changes[key].currentValue !== currentValue) {
        return true;
      }
    }
    return false;
  };

  isLabelVisible(): boolean {
    return !!this.config['label'];
  }

  getWrapperClass(): string {

    let classNames: Array<string> = [];
    classNames.push('form-group');

    classNames = [].concat(classNames, this.config.wrapperClass);

    return classNames.join(' ');

  }

  getValidationClass() {
    let classNames: Array<string> = [];

    if (this.currentFormItem.valid && (this.currentFormItem.touched && this.currentFormItem.dirty)) {
      classNames.push('has-success');
    }

    if (!this.currentFormItem.valid && (this.currentFormItem.touched && this.currentFormItem.dirty)) {
      classNames.push('has-danger');
    }

    return classNames.join(' ');
  }

}
