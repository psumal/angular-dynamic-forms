import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { DynamicFormElementService } from '../../dymanic-form-element/dynamic-form-element.service';
import { IDynamicFormElementModel } from '../../dymanic-form-element/model/base/form-control-options';
import { FormArray } from '@angular/forms';
import { ValueChangeSubscriptionService } from '../../value-change-subscriptions/value-change-subscription.service';

@Component({
  inputs: ['config', 'group'],
  selector: 'df-form-group',
  templateUrl: './item-formArrayGroup.component.html',
  providers: [DynamicFormElementService]
})
export class FormArrayGroupComponent implements OnInit, OnDestroy {

  static controlTypes = ['formArrayGroup'];

  formInitialized = false;
  private subscriptions: any[] = [];

  @HostBinding('class')
  hostClass: string;

  private _config: IDynamicFormElementModel;
  set config(config: IDynamicFormElementModel) {
    this._config = config;
    this.items = config.config;
  }

  get config(): IDynamicFormElementModel {
    return this._config;
  }

  private _group: FormArray;
  set group(group: FormArray) {
    this._group = group;
  }

  get group(): FormArray {
    return this._group;
  }

  private _items: IDynamicFormElementModel[] = [];
  set items(value: IDynamicFormElementModel[]) {
    this._items = value;
  }

  get items(): IDynamicFormElementModel[] {
    return this._items || [];
  }

  _isRendered: boolean = true;

  set isRendered(value: boolean) {
    this._isRendered = value;
  }

  get isRendered(): boolean {
    return this._isRendered;
  }

  get currentFormItem() {
      return this.group.at(parseInt(this.config.key))
  }

  constructor(protected dfes: DynamicFormElementService,
              protected vcss: ValueChangeSubscriptionService) {

  }

  ngOnInit() {
    setTimeout(() => {
      if (this.group instanceof FormArray) {
        console.log('FormArray', typeof this.group, this.group instanceof FormArray);
        this.dfes.addGroupConfigToArray(this.group as FormArray, this.config);
      } else {
        throw new Error('');
      }

      this.formInitialized = true;
    })
  }

  ngOnDestroy() {
    this.destroySubscriptions();
    this.dfes.removeConfigFromArray(this.group, this.config);
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


}
