import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {DynamicFormUtils} from "../services/dynamic-form.utils";
import {IDynamicFormOnPayLoadChangeEvent} from "../dynamic-form.scruct";
import {DynamicFormService} from "../services/dynamic-form.service";
import {AbstractFormControlModel} from "../model/base/form-control";

@Component({
  moduleId: module.id,
  inputs: ['config', 'group', 'model'],
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form.component.html',
  providers: [DynamicFormUtils, DynamicFormService]
})
export class DynamicFormComponent implements OnInit {

  private _config: AbstractFormControlModel<any>[] = [];
  set config(config: Array<any>) {

    let prepConfig = this.setParentId(config);
    console.log('prepConfig: ', prepConfig);
    let formConfig = this.configToFormConfig(prepConfig);

    console.log('formConfig: ', formConfig);

    this._config = formConfig;

    this.renderForm();

  }

  get config(): Array<any> {
    return this._config;
  }



  model: {} = {};

  group: FormGroup;

  constructor(protected dfService: DynamicFormService, protected fb:FormBuilder) {

  }

  configToFormConfig(config:any) {

    return config.map((conf:any) => {
      let newItem = {};
      if(conf['controlType'] == "formGroup") {
        newItem = DynamicFormUtils.createFormItem(conf);
        newItem['config'] = this.configToFormConfig(conf.config);
      } else {
        newItem = DynamicFormUtils.createFormItem(conf);
      }
      return newItem;
    });

  }

  setParentId(config:any, parentId:string = '', formPath?:string[] ):any {

    return config.map((conf:any) => {
      let newConf:any = {...conf};
      let formPathNew = formPath?[...formPath]:[];

      newConf.parentId = parentId;
      newConf.formPath = [];

      if(newConf.parentId) {
        formPathNew.push(newConf.key);
        newConf.formPath = formPathNew;
      } else {
        newConf.formPath.push(newConf.key);
      }


      if(newConf.controlType === 'formGroup') {
        newConf.config = this.setParentId(newConf.config, newConf.key, newConf.formPath);
      }

      return newConf;
    });
  }

  ngOnInit(): void {

    this.renderForm();

    let changes = this.group.valueChanges;

    changes.subscribe(
      (next) => {
        this.model = next;
      },
      () => {},
      () => {},
    )
  }

  ngOnChanges(changes: SimpleChanges): void {

    let valueChanged = function (key: string, changes: SimpleChanges): boolean {
      if (key in changes) {
        if (changes[key].currentValue !== changes[key].previousValue) {
          return true;
        }
      }
      return false;
    };

    //---------------------------------------

    if (valueChanged('model', changes)) {
      this.model = changes['model'].currentValue || {};
    }

    if (valueChanged('config',changes)) {
      this.config = changes['config'].currentValue || [];
    }

  }

  protected renderForm(): void {
    console.log('renderForm!');
    this.group = this.dfService.toFG(this.config);

  }

}
