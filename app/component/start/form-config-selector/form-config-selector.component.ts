import {Component, AfterViewInit} from "@angular/core";
import {FormConfigService} from "../form-config.service";
import {FormGroup} from "@angular/forms";
import {IAbstractFormControlModel, ISelectOption} from "../../../common/dynamic-form/model/item.struckts";

@Component({
  moduleId: module.id,
  selector: 'form-config-selector-comp',
  templateUrl: 'form-config-selector.component.html'
})
export class FormConfigSelectorComponent implements AfterViewInit {

  configSelectionConfig: IAbstractFormControlModel = {};
  configSelectionForm: FormGroup = new FormGroup({});
  formConfigs: Array<any> = [];

  dynamicForm: FormGroup = new FormGroup({});
  formModel: any = {};
  formConfig: any = [];

  constructor(protected formConfigService: FormConfigService) {

    this.formConfig = formConfigService.getPersonalDataConfig();
    this.formConfigs = formConfigService.getAllFormConfigs();
    this.configSelectionConfig = {
      config: [
        {
          controlType: 'select',
          key: 'configSelect',
          label: 'Config Select',
          options: this.getConfigMap()
        }
      ]
    };
  }

  getConfigMap(): ISelectOption[] {
    let idMap: ISelectOption[] = this.formConfigs.map((config: any) => {
      return {label: config.key, value: config.key}
    });

    return idMap;
  }

  getConfigByKey(key: string): any {
    return this.formConfigs
      .filter((config: any) => {
        return config.key == key;
      })[0];
  }

  updateFormConfig(formValue: any) {
    const configSet: any = this.getConfigByKey(formValue.configSelect);
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
