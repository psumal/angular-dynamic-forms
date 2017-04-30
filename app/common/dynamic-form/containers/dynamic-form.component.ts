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

    console.log('before prep parentId', [...config]);
    let prepConfig = this.setParentId(config);
    console.log('after prep parentId', [...prepConfig]);

    let formConfig = this.configToFormConfig(prepConfig);
    console.log('after prep formConfig', [...formConfig]);

    this._config = formConfig;
    console.log(this._config);

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
      console.log('config.controlType', conf['controlType']);
      if(conf['controlType'] == "formGroup") {
        newItem = DynamicFormUtils.createFormItem(conf);
        newItem['config'] = this.configToFormConfig(conf.config);
        console.log('fg newItem', newItem);
      } else {
        newItem = DynamicFormUtils.createFormItem(conf);
        console.log('newItem', newItem);
      }
      return newItem;
    });

  }

  setParentId(config:any, parentId:string = ''):any {
    return config.map((conf:any) => {
      console.log('setParentId for: ',  conf.key, ' with parentId ', parentId);
      if(conf.controlType === 'formGroup') {
        console.log('call recursive: ', conf.config, conf.key);
        conf.config = this.setParentId(conf.config, conf.key);
      }
      conf.parentId = parentId;
      return conf;
    });
  }

  ngOnInit(): void {

    this.renderForm();

    let changes = this.group.valueChanges;

    changes.subscribe(
      (next) => {
        this.model = next;
        console.log('formPathArr: ', this.config['formPath'] );
        console.log('CHANGE ', this.group.get(['groupTest', 'TextboxFg1']) );
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
    this.group = this.dfService.toFG(this.config);

  }

}
