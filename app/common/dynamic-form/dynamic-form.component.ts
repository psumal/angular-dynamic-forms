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

  set payLoad(value: any) {
    this._payLoad = value;
    //let onPayloadChangeEvent: IDynamicFormOnPayLoadChangeEvent = {payLoad: this._payLoad};
    //this.onPayloadChange.emit(onPayloadChangeEvent);
  }

  private _items: ItemBase<any>[] = [];
  @Input()
  set items(items: ItemBase<any>[]) {
    this._items = items.map((item: ItemBase<any>) => {
      return ItemControlService.createFormItem(item);
    });
    this.renderForm();
  }
  get items(): ItemBase<any>[] {
    return this._items;
  }

  @Input() model: {} = {};
  form: FormGroup;

  @Output()
  onPayloadChange: EventEmitter<IDynamicFormOnPayLoadChangeEvent> = new EventEmitter<IDynamicFormOnPayLoadChangeEvent>();

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
      console.log("Items changed: ", changes['items']);
      this.items = changes['items'].currentValue || [];
    }

  }

  onSubmit(): void {
    //this.payLoad = this.form.value;
    let payLoad: IDynamicFormOnPayLoadChangeEvent = {payLoad: this.form.value};
    this.onSubmitted.emit(payLoad);
  }

  protected renderForm(): void {
    console.log('renderForm');
    this.form = this.dfService.toFG(this.items, this.model);
    //this.payLoad = this.form.value;
  }

}
