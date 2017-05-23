import {Component, Inject, OnInit, Optional} from "@angular/core";
import {FormArray, FormGroup} from "@angular/forms";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";
import {DynamicFormService} from "../../dynamic-form/services/dynamic-form.service";
import {
  CHANGE_SUBSCRIPTIONS, ChangeSubscriptionFn,
  ChangeSubscriptions
} from "../../dynamic-form/injects/changeSubscriptions";
import 'rxjs/Rx'
import {Observable} from "rxjs/Rx";
import {Subscription} from "rxjs/Subscription";
import {IAbstractFormControlModel} from "../../dynamic-form/model/item.struckts";


@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'container',
  templateUrl: 'container.component.html',
})
export class ContainerComponent implements OnInit {
  static controlTypes = ["container"];

  subscriptions: any[] = [];

  private _config: AbstractFormControlModel;
  set config(config: AbstractFormControlModel) {
    this._config = config;
    this.items = this._config.config;
  }

  get config(): AbstractFormControlModel {
    return this._config;
  }

  private _items: AbstractFormControlModel[] = [];
  set items(value: AbstractFormControlModel[]) {
    this._items = value
  }

  get items(): AbstractFormControlModel[] {
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

  constructor(private dfs:DynamicFormService) {
  }

  ngOnInit(){
    //this.subscriptions = this.dfs.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged);
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
