import {Component, OnInit, OnDestroy, EventEmitter, Inject, Optional} from "@angular/core";

import {DynamicFormService} from "../../dynamic-form/services/dynamic-form.service";
import {FormGroup, AbstractControl} from "@angular/forms";
import {TextboxItem} from "../../dynamic-form/model/item-textbox";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-control',
  templateUrl: 'control.component.html',
})
export class ControlComponent implements OnInit, OnDestroy {

  static controlTypes = ["select", "checkbox", "radio", "textbox", "textarea"];

  subscriptions:any[] = [];

  private _config: TextboxItem;
  set config(config: TextboxItem) {
    this._config = this.dfs.createFormItem(config) as TextboxItem;
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

  _isRendered:boolean = true;

  set isRendered(value:boolean) {
    this._isRendered = value;
  }

  get isRendered():boolean {
    return this._isRendered;
  }

  get currentFormItem():AbstractControl {
    if(this.group.get(this.config.key)) {
      return this.group.get(this.config.key);
    }
  }

  constructor( protected dfs:DynamicFormService) {

  }

  ngOnInit() {
    this.dfs.addConfigToGroup(this.group, this.config);
    this.subscriptions = this.dfs.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged)
  }

  ngOnDestroy() {
    this.dfs.removeConfigFromGroup(this.group, this.config);
  }

  //View helper
  isControlTypeVisible(controlType: string): boolean {
    return this.config.controlType === controlType;
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

  getCurrentValue() {
    if(this.currentFormItem && 'value' in this.currentFormItem) {
      return this.currentFormItem.value;
    }
  }

  getCurrentStatus() {
    if(this.currentFormItem && 'status' in this.currentFormItem) {
      return this.currentFormItem.status;
    }
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

  //
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

  //sideEffects
  onValueSubscriptionChanged = ($event:any) => {

    const name = $event.name;
    switch(name) {
      case 'isRendered':
        this.isRendered = $event.result;
        break;
    }

  }

}
