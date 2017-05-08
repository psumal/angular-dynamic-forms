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


  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: {}): any {

  }


  onSubmitted($event: {}) {

  }


}
