import {Component} from "@angular/core";
import {FormConfigService} from "./form-config.service";
import {FormGroup} from "@angular/forms";
import {IDynamicFormElementModel} from "../../../modules/dymanic-form-element/model/base/form-control-options";
import {ISelectOption} from "../../../modules/dymanic-form-element/model/base/objects/select-option";

@Component({
  selector: 'form-config-selector-comp',
  templateUrl: 'form-config-selector.component.html'
})
export class FormConfigSelectorComponent {

  configSelectionConfig: IDynamicFormElementModel = {};
  configSelectionForm: FormGroup = new FormGroup({});
  formConfigs: Array<any> = [];

  formConfig: IDynamicFormElementModel = {};
  dynamicForm: FormGroup = new FormGroup({});
  formModel: any = {};

  constructor(protected formConfigService: FormConfigService) {

    this.formConfig = formConfigService.getContactData();
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
      return {label: config.label, value: config.key}
    });

    return idMap;
  }

  getConfigByKey(key: string): any {
    return this.formConfigs
      .find((config: any) => {
        return config.key == key;
      });
  }

  updateFormConfig(formValue: any) {
    console.log('formValue: ', formValue);
    if (formValue || formValue.toString() === '0') {
      const configSet: any = this.getConfigByKey(formValue);
      console.log('configSet: ', configSet);
      this.formConfig = configSet.config || {};
    }
  }

  getModel() {
    return this.formModel;
  }

  onDynamicFormChange($event: any) {
    this.formModel = $event.change;
  }

  onSubmitConfigSelection(form: any) {

    if (form.valid) {
      this.updateFormConfig(form.value.configSelect);
    }

  }

}
