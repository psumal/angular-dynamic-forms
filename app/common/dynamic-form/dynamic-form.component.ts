import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicFormUtils} from "./dynamic-form.utils";
import {IDynamicFormOnPayLoadChangeEvent} from "./dynamic-form-scruct";
import {DynamicFormService} from "./dynamic-form.service";
import {DFFormGroupComp} from "../df/df-fg/df-form-group.component";
import {AbstractFormControlModel} from "./model/base/form-control";

/*

 interface IDynamicFormComponent {
 renderForm;
 model;
 items;
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

  private _items: AbstractFormControlModel<any>[] = [];
  @Input()
  set items(items: Array<any>) {

    this._items = (<any>items).map((item: any) => {
      let newItem = DynamicFormUtils.createFormItem(item);
      if (newItem) {
        return newItem;
      }
    });
    this.renderForm();
  }

  get items(): Array<any> {
    return this._items;
  }

  @Input() model: {} = {};
  form: FormGroup;

  dynComp = DFFormGroupComp;

  dynCompData = {
    component: DFFormGroupComp,
    inputs: {
      object : {'test':'test'}
    }
  };

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

    if ('items' in changes) {
      this.items = changes['items'].currentValue || [];
    }

  }

  onSubmit(): void {
    //this.payLoad = this.form.value;
    let payLoad: IDynamicFormOnPayLoadChangeEvent = {payLoad: this.form.value};
    this.onSubmitted.emit(payLoad);
  }

  protected renderForm(): void {
    this.form = this.dfService.toFG(this.items, this.model);
    //this.payLoad = this.form.value;
  }

}
