import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {IDynamicFormElementModel} from "../../dymanic-form-element/model/base/form-control-options";
import {DynamicFormElementService} from "../../dymanic-form-element/dynamic-form-element.service";
import {ValueChangeSubscriptionService} from "../../reactive-utils/value-change-subscription.service";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'container',
  templateUrl: 'container.component.html',
})
export class ContainerComponent implements OnInit {
  static controlTypes = ["container"];

  subscriptions: any[] = [];

  private _config: IDynamicFormElementModel;
  set config(config: IDynamicFormElementModel) {
    this._config = config;
    this.items = this._config.config;
  }

  get config(): IDynamicFormElementModel {
    return this._config;
  }

  private _items: IDynamicFormElementModel[] = [];
  set items(value: IDynamicFormElementModel[]) {
    this._items = value
  }

  get items(): IDynamicFormElementModel[] {
    return this._items || [];
  }

  get currentFormItem() {
    return this.group;
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

  constructor(private dfes:DynamicFormElementService,
  private vcss:ValueChangeSubscriptionService) {
  }

  ngOnInit(){
    this.subscriptions = this.vcss.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged);
  }

  getWrapperClass():string {
    let classNames: string[] = [];
    classNames.push('row');
    classNames.push(...this.config.wrapperClass);
    return classNames.join(' ');
  }

  onValueSubscriptionChanged = ($event:any) => {

    const name = $event.name;
    switch(name) {
      case 'isRendered':
        this.isRendered = $event.result;
        break;
    }

  }


}
