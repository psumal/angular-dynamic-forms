import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicFormUtils} from "./dynamic-form.utils";
import {IDynamicFormOnPayLoadChangeEvent} from "./dynamic-form-scruct";
import {DynamicFormService} from "./dynamic-form.service";
import {AbstractFormControlModel} from "./model/base/form-control";

/*

 interface IDynamicFormComponent {
 renderForm;
 model;
 config;
 payLoad;
 onPayloadChange;
 onSave;
 }
 */
@Component({
  moduleId: module.id,
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [DynamicFormUtils, DynamicFormService]
})
export class DynamicFormComponent implements OnInit {

  set payLoad(value: any) {

  }

  private _config: AbstractFormControlModel<any>[] = [];
  @Input()
  set config(items: Array<any>) {

    this._config = (<any>items).map((item: any) => {
      let newItem = DynamicFormUtils.createFormItem(item);
      if (newItem) {
        return newItem;
      }
    });
    this.renderForm();
  }

  get config(): Array<any> {
    return this._config;
  }

  @Input() model: {} = {};

  form: FormGroup;

  @Output()
  onPayloadChange: EventEmitter<IDynamicFormOnPayLoadChangeEvent> = new EventEmitter<IDynamicFormOnPayLoadChangeEvent>();

  @Output()
  onSubmitted: EventEmitter<IDynamicFormOnPayLoadChangeEvent> = new EventEmitter<IDynamicFormOnPayLoadChangeEvent>();

  private _payLoad: any;

  constructor(private ics: DynamicFormUtils, protected dfService: DynamicFormService) {

  }

  ngOnInit(): void {
    this.renderForm();
  }

  ngOnChanges(changes: SimpleChanges): void {

    let valueChanged = function (key: string, changes: SimpleChanges): boolean {
      if (key in changes) {
        if (changes[key].currentValue !== changes[key].previousValue) {
          return true;
        }
      }
      return false;
    };

    //---------------------------------------

    if (valueChanged('model', changes)) {
      this.model = changes['model'].currentValue || {};
      //this.renderForm();
    }

    if (valueChanged('config',changes)) {
      this.config = changes['config'].currentValue || [];
    }

  }

  protected renderForm(): void {
    console.log('renderForm config: ', this.config);
    this.form = this.dfService.toFG(this.config, this.model);
    //this.payLoad = this.form.value;
  }

}
