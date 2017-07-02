import {
  ChangeDetectorRef, Component, HostBinding, OnDestroy,
  OnInit
} from "@angular/core";
import {DynamicFormElementService} from "../../dymanic-form-element/dynamic-form-element.service";
import {IDynamicFormElementModel} from "../../dymanic-form-element/model/base/form-control-options";
import { FormArray, FormGroup } from '@angular/forms';
import {ValueChangeSubscriptionService} from "../../value-change-subscriptions/value-change-subscription.service";
import { ButtonItem } from '../../dymanic-form-element/model/item-button';
import {FormArrayItem} from '../../dymanic-form-element/model/item-formArray'

@Component({
  inputs: ['config', 'group'],
  selector: 'df-form-array',
  templateUrl: './item-formArray.component.html',
  providers: [DynamicFormElementService]
})
export class FormArrayComponent implements OnInit, OnDestroy {


  static controlTypes = ["formArray"];

  private _formInitialized = false;

  get formInitialized(): boolean {
    return this._formInitialized
  }

  set formInitialized(value: boolean) {
    this._formInitialized = value
  }

  private subscriptions: any[] = [];

  @HostBinding('class')
  hostClass:string;

  private _config: IDynamicFormElementModel;
  set config(config: IDynamicFormElementModel) {
    this._config = new FormArrayItem(config);
    this.items = [];
    this.addGroup(config.numOfRows)
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

  private _items: IDynamicFormElementModel[] = [];
  set items(items: IDynamicFormElementModel[]) {
    this._items = items;
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

  get currentFormItem():FormArray {
    return this.group.get(this.config.key) as FormArray;
  }

  constructor(protected dfes: DynamicFormElementService,
              protected vcss: ValueChangeSubscriptionService,
  protected cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.dfes.addArrayConfigToGroup(this.group, this.config);
      //this.subscriptions = this.vcss.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged)
      this.formInitialized = true;
      console.log('currentFormItem: ', this.currentFormItem);
      this.cdr.detectChanges();
    });
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

  addGroup( numOfRows: number) {
    numOfRows = numOfRows || 1;

    const config:IDynamicFormElementModel[] = this.config.config;
    const dynFormGroup:IDynamicFormElementModel = {
      key:'',
      controlType: 'formArrayGroup',
      config:config
    };

    for(let i = 0; i < numOfRows;i++) {
      const newGroup = {...dynFormGroup};
      newGroup.key = (this._items.length).toString();
      this.items.push(newGroup)
    }

    console.log('this.items', this.items);

  }

  removeGroup(index:number) {
    const temp = Array.from(this.items);

    temp.splice(index,1);
    console.log(index, temp, this.items);

    this.items = temp;

  }

}
