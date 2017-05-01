import {Component, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {FormGroupItem} from "../../../common/dynamic-form/model/item-formGroup";
import {DynamicFormUtils} from "../../../common/dynamic-form/services/dynamic-form.utils";
import {FormConfigService} from "../form-config.service";

@Component({
  moduleId: module.id,
  inputs : ['config', 'model'],
  selector: 'form-builder-comp',
  templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent implements OnInit, OnChanges {

  dynamicItems:any;
  config:any = [1,2];
  model:any={};


  constructor(protected formConfServ:FormConfigService) {
    this.config = formConfServ.getValidationTestConfig();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: {}): any {

  }


  onSubmitted($event: {}) {
    let item: any | FormGroupItem = DynamicFormUtils.createFormItem($event['payLoad']);
    if (item) {
      this.dynamicItems = this.dynamicItems.concat(item, []);
    }
  }


}
