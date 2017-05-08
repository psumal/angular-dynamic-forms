import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import {DynamicFormService} from "../../dynamic-form/services/dynamic-form.service";
import {FormBuilder, FormGroup, AbstractControl} from "@angular/forms";
import {TextboxItem} from "../../dynamic-form/model/item-textbox";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-item',
  templateUrl: 'control.component.html',
})
export class ControlComponent implements OnInit {

  static controlTypes = ["select", "checkbox", "radio", "textbox", "textarea"];

  private _config: TextboxItem;
  set config(config: TextboxItem) {
    this._config = config;
  }

  get config(): TextboxItem {
    return this._config;
  }

  private _group: FormGroup;
  set group(group: FormGroup) {
    this._group = group;
  }

  get group(): FormGroup {
    return this._group;
  }

  get currentFormItem():AbstractControl {
    return this.group.get(this.config.key);
  }

  constructor( protected dfs:DynamicFormService,
               protected dfb:FormBuilder) {
  }

  ngOnInit() {
    this.addConfigToGroup();
  }

  addConfigToGroup() {
      let configParams:any[] = this.dfs.getFormControlParamsArray(this.config);
      let control:any = (<any>this.dfb).control(...configParams);
console.log('control: ', control, configParams);
      this.group.addControl(this.config.key, control);
  }

  removeConfigFromGroup() {
    this.group.removeControl(this.config.key);
  }

  getControlClass(): string {
    let classNames: string[] = [];

    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames.push('form-check');
    }
    else if (this.config.controlType === 'textbox' && this.config.inputType === 'file') {
      classNames.push('form-control-file');
    }
    else {
      classNames.push('form-control');
    }

    return classNames.join('');
  }

  isNoOptPresent() {
    return 'noOptKey' in this.config && !!this.config['noOptKey'];
  }

  getNoOptText() {

    let text: string = "-- noOpt --";

    if ('noOptKey' in this.config && this.config['noOptKey'] && this.config['noOptKey'] !== true) {
      text = this.config['noOptKey'];
    }

    return text;
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
