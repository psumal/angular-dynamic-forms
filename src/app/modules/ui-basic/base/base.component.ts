import { Component, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';

import { DynamicFormElementService } from '../../dymanic-form-element/dynamic-form-element.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValueChangeSubscriptionService } from '../../value-change-subscriptions/value-change-subscription.service';
import { IDynamicFormElementModel } from '../../dymanic-form-element/model/base/form-control-options';


@Component({
  inputs: ['config', 'group']
})
export class BaseUiComponent implements OnInit, OnDestroy {
  static controlTypes = ['textbox'];

  formInitialized = false;

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

  constructor(protected dfes: DynamicFormElementService,
              protected vcss: ValueChangeSubscriptionService) {

  }

  ngOnInit() {
    this.hostClass = this.getHostClass();
    setTimeout(() => {
      this.dfes.addControlConfigToGroup(this.group, this.config);
      this.subscriptions = this.vcss.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged);
      this.formInitialized = true;
    })
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

  getHostClass(): string {
    let classNames: string[] = [];

    if (this.config) {
      classNames.push(...this.config.wrapperClass);
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

  //sideEffects
  onValueSubscriptionChanged: Function = ($event: any) => {
    const name = $event.name;
    switch (name) {
      case 'isRendered':
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

}
