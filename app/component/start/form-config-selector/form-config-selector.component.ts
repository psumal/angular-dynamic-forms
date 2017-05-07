import {Component, AfterViewInit} from "@angular/core";
import {FormConfigService} from "../form-config.service";
import {FormGroup} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'form-config-selector-comp',
  templateUrl: 'form-config-selector.component.html'
})
export class FormConfigSelectorComponent implements AfterViewInit {




  configSelectionForm:any[] = [];
  formConfigs: Array<any> = [];

  form: FormGroup = new FormGroup({});
  formModel: any = {};
  formConfig: any = [];

  constructor(protected formConfigService: FormConfigService) {
    this.formConfigs = [
      {
        key: 'Textbox',
        value: {
          formName: 'Textbox Config',
          config: formConfigService.getTextboxConfig()
        }
      },
      {
        key: 'Checkbox',
        value: {
          formName: 'Checkbox Config',
          config: formConfigService.getCheckboxConfig()
        }
      },
      {
        key: 'Radio',
        value: {
          formName: 'Radio Config',
          config: formConfigService.getRadioConfig()
        }
      },
      {
        key: 'Select',
        value: {
          formName: 'Select Config',
          config: formConfigService.getSelectConfig()
        }
      },
      {
        key: 'Textarea',
        value: {
          formName: 'Textarea Config',
          config: formConfigService.getTextareaConfig()
        }
      },
      {
        key: 'Buttons',
        value: {
          formName: 'Buttons Config',
          config: formConfigService.getButtonConfig()
        }
      },
      {
        key: 'formGroup Test',
        value: {
          formName: 'FormGroup',
          config: formConfigService.getFormGroupConfig()
        }
      },

      {
        key: 'validation Test',
        value: {
          formName: 'Validation Test',
          config: formConfigService.getValidationConfig()
        }
      },

      {
        key: 'FormatterParser',
        value: {
          formName: 'FormatterParser',
          config: formConfigService.getFormatterParserConfig()
        }
      },

      {
        key: "generic Item",
        value: {
          formName: "",
          config: formConfigService.getGenericElementConfig()
        }
      },
      {
        key: 'Personal Data',
        value: {
          formName: 'Personal Data',
          config: formConfigService.getPersonalDataConfig()
        }
      },
      {
        key: 'Donut Campaign',
        value: {
          formName: 'Donut Campaign',
          config: formConfigService.getCampaign()
        }
      },
    ];
    this.formConfig = formConfigService.getPersonalDataConfig();
    this.configSelectionForm = [{ controlType: 'select', key: 'configSelect', label: 'Config Select', options: this.getConfigMap() }];
  }

  getConfigMap() {
    let idMap:any[] = this.formConfigs.map((config) => {
      return {label: config.key, value: config.key }
    });

    return idMap;
  }

  getConfigByKey(key:string):any {
    return this.formConfigs
      .filter( (config:any) => {
        return config.key == key;
    } )[0];
  }

  updateFormConfig(formValue: any) {
    const configSet:any = this.getConfigByKey(formValue.configSelect);
    this.formConfig = configSet.value.config || {};
    console.log('updateFormConfig: ', this.formConfig);

  }

  ngAfterViewInit() {

  }

  onDynamicFormChange($event: any) {
    console.log('onDynamicFormChange: ', $event);
    this.formModel = $event;
  }


  onSubmit(form: any) {
    this.formConfig = this.updateFormConfig(form.value.formConfigSelect.config);
  }

}
