import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges}  from '@angular/core';
import {FormGroup}                 from '@angular/forms';
import {ItemBase}              from './item/item-base';
import {ItemControlService}    from './item/item.service';
import {IDynamicFormOnPayLoadChangeEvent} from "./dynamic-form-scruct";
import {DynamicFormService} from "./dynamic-form.service";

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
  providers: [ItemControlService, DynamicFormService]
})
export class DynamicFormComponent implements OnInit {

  get onPayloadChange(): EventEmitter<IDynamicFormOnPayLoadChangeEvent> {
    return this._onPayloadChange;
  }

  set onPayloadChange(value: EventEmitter<IDynamicFormOnPayLoadChangeEvent>) {
    this._onPayloadChange = value;
  }

  set payLoad(value: any) {
    this._payLoad = value;
    //let onPayloadChangeEvent: IDynamicFormOnPayLoadChangeEvent = {payLoad: this._payLoad};
    //this.onPayloadChange.emit(onPayloadChangeEvent);
  }

  private _items: ItemBase<any>[] = [];
  @Input()
  set items(items: Array) {
    this._items = items.map((item: ItemBase<any>) => {
      let newItem = ItemControlService.createFormItem(item);
      return newItem;
    });

  }
  get items(): ItemBase<any>[] {
    return this._items;
  }


  @Input() model: {} = {};
  form: FormGroup;

  @Output() private
  _onPayloadChange: EventEmitter<IDynamicFormOnPayLoadChangeEvent> = new EventEmitter<IDynamicFormOnPayLoadChangeEvent>();

  @Output()
  onSubmitted: EventEmitter<IDynamicFormOnPayLoadChangeEvent> = new EventEmitter<IDynamicFormOnPayLoadChangeEvent>();

  private _payLoad: any;

  constructor(private ics: ItemControlService, protected dfService:DynamicFormService) {

  }

  ngOnInit(): void {
    this.renderForm();
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

    if (valueChanged('model', changes)) {
      this.model = changes['model'].currentValue || {};
      //this.renderForm();
    }

    if (valueChanged('items', changes)) {
      this.items = changes['items'].currentValue || [];
      console.log('after apply new items');
      this.renderForm();
    }

  }

  onSubmit(): void {
    console.log("onSubmit");
    //this.payLoad = this.form.value;
    let payLoad: IDynamicFormOnPayLoadChangeEvent = {payLoad: this.form.value};
    this.onSubmitted.emit(payLoad);
  }

  protected renderForm(): void {
    console.log('before apply renderForm');
    this.form = this.dfService.toFG(this.items, this.model);
    console.log('form:', this.form);
    console.log('after apply renderForm');
    //this.payLoad = this.form.value;
  }

}
