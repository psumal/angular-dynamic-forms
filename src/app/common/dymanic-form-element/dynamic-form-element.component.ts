import {Component, OnInit, EventEmitter, OnDestroy} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {IDynamicFormElementModel} from "./model/base/form-control-options";

@Component({
  inputs: ['config', 'group'],
  outputs: ['onGroupValueChanged'],
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-element.component.html'
})
export class DynamicFormElementComponent implements OnInit, OnDestroy {

  private _config: IDynamicFormElementModel;
  set config(config: IDynamicFormElementModel) {
    this._config = {...config} as IDynamicFormElementModel;
    this.items = config.config;
  }

  get config(): IDynamicFormElementModel {
    return this._config;
  }

  protected _items: IDynamicFormElementModel[];
  get items(): IDynamicFormElementModel[] {
    return this._items;
  }

  set items(items: IDynamicFormElementModel[]) {
    this._items = items || [];
  }

  private _group: FormGroup;
  set group(group: FormGroup) {
    this._group = group;
  }

  get group(): FormGroup {
    return this._group;
  }

  subscriptions: any[] = [];

  onGroupValueChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy() {
   this.destroySubscriptions();
  }

  initSubscriptions(){
    if(this.group) {
    const valueChanges = this.group.valueChanges;
    this.subscriptions.push(
      valueChanges.subscribe((change: any) => {
        this.onGroupValueChanged.emit({change:change});
      })
    );
    }
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
