import {Component, AfterViewInit} from "@angular/core";
import {FormConfigService} from "../form-config.service";
import {FormGroup} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'form-config-selector-comp',
  templateUrl: 'form-config-selector.component.html'
})
export class FormConfigSelectorComponent implements AfterViewInit {


  noOpt: string = "--- none ---";
  demoForms: Array<any>;

  form: FormGroup = new FormGroup({});
  formModel: any = {};

  formConfig: any = [];

  constructor(protected formConfigService: FormConfigService) {

    this.demoForms = [
      {
        key: 'Textbox',
        value: {
          formName: 'Textbox Config',
          formItems: formConfigService.getTextboxConfig()
        }
      },
      {
        key: 'Checkbox',
        value: {
          formName: 'Checkbox Config',
          formItems: formConfigService.getCheckboxConfig()
        }
      },
      {
        key: 'Radio',
        value: {
          formName: 'Radio Config',
          formItems: formConfigService.getRadioConfig()
        }
      },
      {
        key: 'Select',
        value: {
          formName: 'Select Config',
          formItems: formConfigService.getSelectConfig()
        }
      },
      {
        key: 'Textarea',
        value: {
          formName: 'Textarea Config',
          formItems: formConfigService.getTextareaConfig()
        }
      },
      {
        key: 'Buttons',
        value: {
          formName: 'Buttons Config',
          formItems: formConfigService.getButtonConfig()
        }
      },
      {
        key: 'formGroup Test',
        value: {
          formName: 'KitchenSink',
          formItems: formConfigService.getFormGroupConfig()
        }
      },

      {
        key: 'validation Test',
        value: {
          formName: 'Validation Test',
          formItems: formConfigService.getValidationConfig()
        }
      },

      {
        key: 'KitchenSink',
        value: {
          formName: 'KitchenSink',
          formItems: formConfigService.getKitchenSink()
        }
      },

      {
        key: "generic Item",
        value: {
          formName: "",
          formItems: formConfigService.getGenericElementConfig()
        }
      },
      {
        key: 'Donut Campaign',
        value: {
          formName: 'Donut Campaign',
          formItems: formConfigService.getCampaign()
        }
      },
    ];

    this.formConfig = formConfigService.getPersonalDataConfig();

  }

  updateFormConfig(formItems: any) {
    console.log('updateFormConfig: ', formItems);
    //this.formConfig = formItems;
  }

  ngAfterViewInit() {

  }

  onDynamicFormChange($event: any) {
    console.log('onDynamicFormChange: ', $event);
    this.formModel = $event;
  }


  onSubmit(form: any) {
    this.formConfig = this.updateFormConfig(form.value.formConfigSelect.formItems);
  }

}
