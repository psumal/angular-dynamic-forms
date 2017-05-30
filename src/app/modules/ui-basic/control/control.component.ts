import {Component, ElementRef, HostBinding, OnDestroy, OnInit} from "@angular/core";

import {DynamicFormElementService} from "../../dymanic-form-element/dynamic-form-element.service";
import {AbstractControl, FormGroup} from "@angular/forms";
import {ValueChangeSubscriptionService} from "../../reactive-utils/value-change-subscription.service";
import {IDynamicFormElementModel} from "../../dymanic-form-element/model/base/form-control-options";

@Component({
  inputs: ['config', 'group'],
  selector: 'df-control',
  templateUrl: 'control.component.html',
})
export class ControlComponent implements OnInit, OnDestroy {

  static controlTypes = ["select", "checkbox", "radio", "textbox", "textarea"];

  subscriptions: any[] = [];

  @HostBinding('class')
  hostClass: string;


  private _config: IDynamicFormElementModel;
  set config(config: IDynamicFormElementModel) {
    this._config = this.dfes.createFormItem(config) as IDynamicFormElementModel;
  }

  get config(): IDynamicFormElementModel {
    return this._config;
  }

  private _group: FormGroup;
  set group(group: FormGroup) {
    this._group = group;
  }

  get group(): FormGroup {
    return this._group;
  }

  _isRendered: boolean = true;

  set isRendered(value: boolean) {
    this._isRendered = value;
  }

  get isRendered(): boolean {
    return this._isRendered;
  }

  get currentFormItem(): AbstractControl {
    if (this.group.get(this.config.key)) {
      return this.group.get(this.config.key);
    }
  }

  constructor(protected _elementRef: ElementRef,
              protected dfes: DynamicFormElementService,
              protected vcss: ValueChangeSubscriptionService) {

  }

  ngOnInit() {
    this.hostClass = this.getHostClass();
    this.dfes.addControlConfigToGroup(this.group, this.config);
    this.subscriptions = this.vcss.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged)
  }

  ngOnDestroy() {
    this.destroySubscriptions();
    this.dfes.removeConfigFromGroup(this.group, this.config);
  }

  destroySubscriptions() {
    this.subscriptions.forEach((sub: any) => {
      try {
        sub.unsubscribe();
      }
      catch (e) {
        console.log(new Error(e));
      }
    });
    this.subscriptions = [];
  }

  //View helper
  isControlTypeVisible(controlType: string): boolean {
    return this.config.controlType === controlType;
  }

  getHostClass(): string {
    console.log('getHostClass in control', this.config);
    let classNames: string[] = [];
    classNames.push('form-group');
    if (this.config) {
      classNames.push(...this.config.wrapperClass);
    }
    return classNames.join(' ');
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

    return classNames.join(' ');
  }

  getCurrentValue() {
    if (this.currentFormItem && 'value' in this.currentFormItem) {
      return this.currentFormItem.value;
    }
  }

  getCurrentStatus() {
    if (this.currentFormItem && 'status' in this.currentFormItem) {
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

  isNoOptPresent() {
    return 'noOptKey' in this.config && !!this.config['noOptKey'];
  }

  getNoOptText() {

    let text: string = "-- noOpt --";

    if ('noOptKey' in this.config && this.config['noOptKey'] && this.config['noOptKey'] !== '') {
      text = this.config['noOptKey'];
    }

    return text;
  }

  //sideEffects
  public onValueSubscriptionChanged: Function = ($event: any) => {
    const name = $event.name;
    switch (name) {
      case 'isRendered':
        console.log('isRenderedisRendered', $event);
        this.isRendered = $event.result;
        break;
      //@TODO we need a way to import this custom actions
      case 'syncWithAddressComponent':
        if ($event.result) {
          this.currentFormItem.setValue($event.result)
        }
        break;
    }

  };

  updateAttributes() {
    const el: any = this._elementRef.nativeElement;

    let set = (attr: string, value: any, isBoolAttr?: boolean) => {

      if (isBoolAttr) {
        !!value ? el.setAttribute(attr, '') : el.removeAttribute(attr);
        return;
      }

      value === undefined ? el.removeAttribute(attr) : el.setAttribute(attr, value);
    };

    set('accept', this.config.attrs['accept']);
    set('autoComplete', this.config.attrs['autoComplete']);
    set('aria-describedby', this.config.attrs['aria-describedby']);
    set('disabled', this.config.attrs['disabled'], true);
    set('list', this.config.attrs['list']);
    set('max', this.config.attrs['max']);
    set('min', this.config.attrs['min']);
    set('multiple', this.config.attrs['multiple'], true);
    set('step', this.config.attrs['step']);
    set('tabindex', this.config.attrs['tabindex']);
    set('autofocus', this.config.attrs['autofocus']);
    set('maxlength', this.config.attrs['maxlength'], true);
    set('minlength', this.config.attrs['minlength'], true);
    set('name', this.config.attrs['kez']);
    set('ngClass', this.config.attrs['ngClass']);
    set('placeholder', this.config.attrs['placeholder']);
    set('readonly', this.config.attrs['readonly'], true);
    set('required', this.config.attrs['required'], true);
    set('spellcheck', this.config.attrs['spellcheck']);
    set('type', this.config.attrs['type']);

  }

}
