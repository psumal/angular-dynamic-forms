import {Component} from "@angular/core";
import {FormConfigService} from "./form-config.service";
import {FormGroup} from "@angular/forms";
import {FormGroupItem} from "../../common/dynamic-form/model/item-formGroup";
import {DynamicFormUtils} from "../../common/dynamic-form/services/dynamic-form.utils";

@Component({
  moduleId: module.id,
  selector: 'start',
  templateUrl: 'start.component.html',
})
export class StartComponent {

  demoForms: Array<any>;

  form: FormGroup = new FormGroup({});
  formName: string;
  formItems: Array<any>;
  formModel: {};

  dynamicItems: any[] = [];

  constructor(protected service: FormConfigService) {

    this.formItems = service.getGenericElement();
    this.formModel = {key:"testKEyFromModel"};
    this.demoForms = [
      {
        value: 'Star Rating Config',
        key: {
          formItems: service.getConfigForm(),
          formModel: {
            rating: 4,
            numOfStars: 7,
            size: "large"
          }
        }
      },
      {
        value: 'KitchenSink',
        key: {
          forItems: service.getKitchenSink()
        }
      },
      {
        value: 'Generic form',
        key: {
          forItems: service.getGenericElement()
        }
      }
    ];

  }


  /*DEMO SELECT*/
  onTemplateFromModelChange($event: {model: any}) {
    console.log('onTemplateFromModelChange', $event.model.demo.formItems);

    if ('model' in $event && 'demo' in $event.model) {

      if ('formName' in $event.model.demo) {
        this.formName = $event.model.demo.formName;
      }

      if ('formItems' in $event.model.demo) {
        this.formItems = $event.model.demo.formItems;
      }

      if ('formModel' in $event.model.demo) {
        this.formModel = $event.model.demo.formModel;
      }

    }
  }

  onSubmitted($event: {}) {
    console.log('onSubmitted $event', $event['payLoad']);
    let item: any | FormGroupItem = DynamicFormUtils.createFormItem($event['payLoad']);
    if (item) {
      console.log("generated config: ", item);
      this.dynamicItems = this.dynamicItems.concat(item, []);
    }
  }

}
