import {Component, SimpleChanges, Optional, Inject} from '@angular/core';
import {DynamicFormUtils} from "../../dynamic-form/services/dynamic-form.utils";
import {DynamicFormService} from "../../dynamic-form/services/dynamic-form.service";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";
import {BaseComponent} from "../../dynamic-form/components/base-component/base-component";
import {CHANGE_SUBSCRIPTIONS} from "../../dynamic-form/customSubscriptions/changeSubscriptions";
import {SubscriptionFn} from "../control/control.component";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-form-group',
  templateUrl: 'item-formGroup.component.html',
  providers: [DynamicFormUtils, DynamicFormService]
})
export class FormGroupComponent extends BaseComponent {

  static controlTypes = ["formGroup"];

  _items: AbstractFormControlModel<any>[]= [];
  set items(value:any[]) {
    this._items = value
      .map((item: any) => {

        let newItem = DynamicFormUtils.createFormItem(item);
        if (newItem) {
          return newItem;
        }
      });

  }

  get items() : any[] {
    return this._items;
  }

  private _config: AbstractFormControlModel<any>;

  set config(config: AbstractFormControlModel<any>) {
    super.config = config;
    this.items = config['config'];
  }

  get config(): AbstractFormControlModel<any> {
    return super.config;
  }


  constructor(@Optional() @Inject(CHANGE_SUBSCRIPTIONS) CHANGE_SUBSCRIPTIONS: SubscriptionFn[]) {
    super(CHANGE_SUBSCRIPTIONS);
  }


  ngOnInit() {
    this.initSubscriptionFunctions();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.valueChanged('group', changes, this.group )) {
      this.group = changes['group'].currentValue || {};
    }

    if (this.valueChanged('config', changes, this.config)) {
      this.config = changes['config'].currentValue || [];
    }

  }



}
