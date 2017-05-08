import {Component, OnInit, EventEmitter, OnDestroy, AfterViewInit} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {DynamicFormService} from "../services/dynamic-form.service";
import {AbstractFormControlModel} from "../model/base/form-control";
import {IAbstractFormControlModel} from "../model/item.struckts";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  outputs: ['onGroupValueChanged'],
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form.component.html',
  providers: [DynamicFormService]
})
export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {

  private _config: AbstractFormControlModel;
  set config(config: AbstractFormControlModel) {
    this._config = config;
    this.items = config.config;
  }

  get config(): AbstractFormControlModel {
    return this._config;
  }

  protected _items:AbstractFormControlModel[];
  get items(): AbstractFormControlModel[] {
    return this._items;
  }
  set items(items: AbstractFormControlModel[]) {
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

  constructor(private dfs:DynamicFormService) {

  }

  configToFormConfig(config: any) {

    return config.map((conf: any) => {
      let newItem = {};
      if (conf['controlType'] == "formGroup") {
        newItem = this.dfs.createFormItem(conf);
        newItem['config'] = this.configToFormConfig(conf.config);
      } else {
        newItem = this.dfs.createFormItem(conf);
      }
      return newItem;
    });

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    /*
     const valueChanges = this.group.valueChanges;
     this.subscriptions.push(
     valueChanges.subscribe((change: any) => {
     console.log('valueChanges: ', change);
     this.onGroupValueChanged.emit(change);
     })
     );
     */
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: any) => {
      try {
        sub.unsubscribe();
      }
      catch (e) {}
    })
  }

}
