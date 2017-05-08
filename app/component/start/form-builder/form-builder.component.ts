import {Component, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {FormGroupItem} from "../../../common/dynamic-form/model/item-formGroup";
import {FormConfigService} from "../form-config.service";
import {DynamicFormService} from "../../../common/dynamic-form/services/dynamic-form.service";

@Component({
  moduleId: module.id,
  inputs : ['config', 'model'],
  selector: 'form-builder-comp',
  templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent implements OnInit, OnChanges {

  dynamicItems:any;
  config:any = [];
  model:any={};


  constructor(protected formConfServ:FormConfigService) {
    this.config;// = formConfServ.getValidationConfig();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: {}): any {

  }


  onSubmitted($event: {}) {
    let item: any | FormGroupItem = DynamicFormService.createFormItem($event['payLoad']);
    if (item) {
      this.dynamicItems = this.dynamicItems.concat(item, []);
    }
  }


}
