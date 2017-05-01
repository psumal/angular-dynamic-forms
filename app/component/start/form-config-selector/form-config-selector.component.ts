import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges} from '@angular/core';
import {FormConfigService} from "../form-config.service";

@Component({
  moduleId: module.id,
  selector: 'form-config-selector-comp',
  templateUrl: 'form-config-selector.component.html'
})
export class FormConfigSelectorComponent {

  noOpt:string = "--- none ---";
  demoForms:Array<any>;
  formModel:any= {};

  formConfig:any = [];

  constructor(protected formConfigService: FormConfigService) {

    this.demoForms = [
      {
        value: 'Star Rating Config',
        key: {
          formName: 'Star Rating Config',
          formItems: formConfigService.getConfigForm()
          /*formModel: {
            rating: 4,
            numOfStars: 7,
            size: "large",
          }*/
        }
      },
      {
        value: 'KitchenSink',
        key: {
          formName: 'KitchenSink',
          formItems: formConfigService.getKitchenSink()
        }
      },
      {
        value: 'validation Test',
        key: {
          formName: 'Validation ' +
          'TesT',
          formItems: formConfigService.getValidationTestConfig()
        }
      },
      {
        value: 'formGroup Test',
        key: {
          formName: 'KitchenSink',
          formItems: formConfigService.getFormGroupTestConfig()
        }
      },
      {value : "generic Item",
        key : {
          formName : "",
          formItems : formConfigService.getGenericElement()
        }
      },
      {
        value: 'Donut Campaign',
        key: {
          formName: 'Donut Campaign',
          formItems: formConfigService.getCampaign()
        }
      },
    ];

    //this.formConfig = formConfigService.getConfigForm();

  }

  updateFormConfig(formItems:any) {
    this.formConfig = formItems;
  }

  onSubmit(form:any) {
    this.formConfig = this.updateFormConfig(form.value.formConfigSelect.formItems);
  }

}
