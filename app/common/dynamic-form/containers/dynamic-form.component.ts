import {Component, OnInit, EventEmitter, OnDestroy, AfterViewInit} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {DynamicFormUtils} from "../services/dynamic-form.utils";
import {DynamicFormService} from "../services/dynamic-form.service";
import {AbstractFormControlModel} from "../model/base/form-control";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  outputs: ['onGroupValueChanged'],
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form.component.html',
  providers: [DynamicFormUtils, DynamicFormService]
})
export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {

  private _config: AbstractFormControlModel[] = [];
  set config(config: Array<any>) {

    let prepConfig = this.setParentId(config);
    let formConfig = this.configToFormConfig(prepConfig);

    this._config = formConfig;

    this.renderForm();

  }

  get config(): Array<any> {
    return this._config;
  }

  group: FormGroup;

  subscriptions: any[] = [];

  onGroupValueChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected dfService: DynamicFormService, protected fb: FormBuilder) {


  }

  configToFormConfig(config: any) {

    return config.map((conf: any) => {
      let newItem = {};
      if (conf['controlType'] == "formGroup") {
        newItem = DynamicFormUtils.createFormItem(conf);
        newItem['config'] = this.configToFormConfig(conf.config);
      } else {
        newItem = DynamicFormUtils.createFormItem(conf);
      }
      return newItem;
    });

  }

  setParentId(config: any = [], parentId: string = '', formPath?: string[]): any {
    return config.map((conf: any) => {
      let newConf: any = {...conf};
      let formPathNew = formPath ? [...formPath] : [];

      newConf.parentId = parentId;
      newConf.formPath = [];

      if (newConf.parentId) {
        newConf.formPath = formPathNew;
        newConf.formPath.push(newConf.key)
      } else {
        newConf.formPath.push(newConf.key);
      }


      if (newConf.controlType === 'formGroup') {
        newConf.config = this.setParentId(newConf.config, newConf.key, newConf.formPath);
      }

      return newConf;
    });
  }

  ngOnInit(): void {

    console.log('this.group: ', this.group);
    this.renderForm();

  }

  ngAfterViewInit(): void {
    const valueChanges = this.group.valueChanges;
    this.subscriptions.push(
      valueChanges.subscribe((change: any) => {
        console.log('valueChanges: ', change);
        this.onGroupValueChanged.emit(change);
      })
    );
  }


  ngOnDestroy() {

    this.subscriptions.forEach((sub: any) => {
      try {
        sub.unsubscribe();
      }
      catch (e) {

      }
    })
  }

  protected renderForm(): void {
    //this.group.addControl('test',this.dfService.toFG(this.config));
    this.group = this.dfService.toFG(this.config);
  }

}
