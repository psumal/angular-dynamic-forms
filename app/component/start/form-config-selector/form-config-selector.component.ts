import {Component, AfterViewInit} from "@angular/core";
import {FormConfigService} from "../form-config.service";
import {FormGroup} from "@angular/forms";
import {IAbstractFormControlModel, ISelectOption} from "../../../common/dynamic-form/model/item.struckts";

@Component({
  moduleId: module.id,
  selector: 'form-config-selector-comp',
  templateUrl: 'form-config-selector.component.html'
})
export class FormConfigSelectorComponent {

  configSelectionConfig: IAbstractFormControlModel = {};
  configSelectionForm: FormGroup = new FormGroup({});
  formConfigs: Array<any> = [];

  formConfig: IAbstractFormControlModel = [];
  dynamicForm: FormGroup = new FormGroup({});
  formModel: any = {};

  constructor(protected formConfigService: FormConfigService) {


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
      .filter((config: any) => {
        return config.key == key;
      })[0];
  }

  updateFormConfig(formValue: any) {
      if(formValue.change.configSelect || formValue.change.configSelect.toString() === '0') {
        const configSet: any = this.getConfigByKey(formValue.change.configSelect);
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
    this.updateFormConfig(form.value.formConfigSelect.config);
  }

}
