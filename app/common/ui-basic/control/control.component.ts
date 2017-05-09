import {Component, OnInit, OnDestroy, EventEmitter} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import {DynamicFormService} from "../../dynamic-form/services/dynamic-form.service";
import {FormBuilder, FormGroup, AbstractControl} from "@angular/forms";
import {TextboxItem} from "../../dynamic-form/model/item-textbox";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  outputs: ['onGroupValueChanged'],
  selector: 'df-item',
  templateUrl: 'control.component.html',
})
export class ControlComponent implements OnInit, OnDestroy {

  static controlTypes = ["select", "checkbox", "radio", "textbox", "textarea"];

  subscriptions:any[] = [];

  onGroupValueChanged: EventEmitter<any> = new EventEmitter<any>();


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

  get currentFormItem():AbstractControl {
    if(this.group.get(this.config.key)) {
      return this.group.get(this.config.key);
    }

  }

  constructor( protected dfs:DynamicFormService,
               protected dfb:FormBuilder) {
  }

  ngOnInit() {
    this.addConfigToGroup();
  }

  ngOnDestroy() {
    this.removeConfigFromGroup();
    this.initSubscriptions();
  }

  addConfigToGroup() {
      let configParams:any[] = this.dfs.getFormControlParamsArray(this.config);
      let control:any = (<any>this.dfb).control(...configParams);
      this.group.addControl(this.config.key, control);
  }

  removeConfigFromGroup() {
    this.group.removeControl(this.config.key);
  }

  initSubscriptions(){
    if(this.group) {
      const valueChanges = this.group.valueChanges;
      this.subscriptions.push(
        valueChanges.subscribe((change: any) => {
          console.log('valueChanges: ', change);
          this.onGroupValueChanged.emit(change);
        })
      );
    }
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
}
