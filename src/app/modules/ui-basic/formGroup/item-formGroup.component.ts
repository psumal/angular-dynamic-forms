import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {DynamicFormElementService} from "../../dymanic-form-element/dynamic-form-element.service";
import {IDynamicFormElementModel} from "../../dymanic-form-element/model/base/form-control-options";
import {FormGroup} from "@angular/forms";
import {ValueChangeSubscriptionService} from "../../value-change-subscriptions/value-change-subscription.service";

@Component({
  inputs: ['config', 'group'],
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
  providers: [DynamicFormElementService]
})
export class FormGroupComponent implements OnInit, OnDestroy {

  static controlTypes = ["formGroup"];

  private subscriptions: any[] = [];

  @HostBinding('class')
  hostClass:string;

  private _config: IDynamicFormElementModel;
  set config(config: IDynamicFormElementModel) {
    this._config = config;
    this.items = config.config;
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
    return this.group.get(this.config.key);
  }

  constructor(protected dfes: DynamicFormElementService,
              protected vcss: ValueChangeSubscriptionService) {

  }

  ngOnInit() {
    this.dfes.addGroupConfigToGroup(this.group, this.config);
    console.log('addGroup');
    //this.subscriptions = this.vcss.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged)
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

  //sideEffects
  public onValueSubscriptionChanged:Function = ($event: any) => {
    const name = $event.name;
    switch (name) {
      case 'isRendered':
        this.isRendered = $event.result;
        break;
      //@TODO we need a way to import this custom actions
      case 'syncWithAddressComponent':
        this.currentFormItem.setValue($event.result)
        break;
    }

  };


}
