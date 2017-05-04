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
        value: 'Textbox',
        key: {
          formName: 'Textbox Config',
          formItems: formConfigService.getTextboxConfig()
        }
      },
      {
        value: 'Checkbox',
        key: {
          formName: 'Checkbox Config',
          formItems: formConfigService.getCheckboxConfig()
        }
      },
      {
        value: 'Radio',
        key: {
          formName: 'Radio Config',
          formItems: formConfigService.getRadioConfig()
        }
      },
      {
        value: 'Select',
        key: {
          formName: 'Select Config',
          formItems: formConfigService.getSelectConfig()
        }
      },
      {
        value: 'Textarea',
        key: {
          formName: 'Textarea Config',
          formItems: formConfigService.getTextareaConfig()
        }
      },
      {
        value: 'Buttons',
        key: {
          formName: 'Buttons Config',
          formItems: formConfigService.getButtonConfig()
        }
      },
      {
        value: 'formGroup Test',
        key: {
          formName: 'KitchenSink',
          formItems: formConfigService.getFormGroupConfig()
        }
      },

      {
        value: 'validation Test',
        key: {
          formName: 'Validation Test',
          formItems: formConfigService.getValidationConfig()
        }
      },

      {
        value: 'KitchenSink',
        key: {
          formName: 'KitchenSink',
          formItems: formConfigService.getKitchenSink()
        }
      },

      {value : "generic Item",
        key : {
          formName : "",
          formItems : formConfigService.getGenericElementConfig()
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

  }

  updateFormConfig(formItems:any) {
    this.formConfig = formItems;
  }

  onSubmit(form:any) {
    this.formConfig = this.updateFormConfig(form.value.formConfigSelect.formItems);
  }

}
