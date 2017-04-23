import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges} from '@angular/core';
import {FormConfigService} from "../../component/start/form-config.service";

@Component({
  moduleId: module.id,
  selector: 'template-form-comp',
  templateUrl: 'template-form.component.html'
})
export class TemplateFormComponent implements OnInit, OnChanges {

  demoForms:Array<any>;

  //Inputs
  ///////////////////////////////////////////////////////////////////////////////////////////

  protected _formModel: {} = {};
  get formModel(): {} {
    return this._formModel;
  }

  @Input('model')
  set formModel(value: {}) {
    this._formModel = value || '';
  }

  @Output() onModelChange = new EventEmitter();

  constructor(protected formConfigService: FormConfigService) {

    this.formModel['demo'] = formConfigService.getConfigForm();

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

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    let valueChanged = function (key: string, changes: SimpleChanges): boolean {
      if (key in changes) {
        if (changes[key].currentValue != changes[key].previousValue) {
          return true;
        }
      }
      return false;
    };

    //---------------------------------------

    if (valueChanged('formModel', changes)) {
      this.formModel = changes['formModel'].currentValue;
    }

  }

  onSubmit(value:any, valid:boolean) {
    this.onModelChange.emit({model:this.formModel});
  }

}
