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
  set config(items: Array<any>) {
    this._config = (<any>items).map((item: any) => {
      let newItem = DynamicFormUtils.createFormItem(item);
      if (newItem) {
        return newItem;
      }
    });
    this.renderForm();
  }

  get config(): Array<any> {
    return this._config;
  }

  model: {} = {};

  group: FormGroup;

  constructor(protected dfService: DynamicFormService, protected fb:FormBuilder) {

  }

  ngOnInit(): void {
    this.renderForm();
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
