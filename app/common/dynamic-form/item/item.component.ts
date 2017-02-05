import {Component, Input} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {ItemBase}     from './item-base';
@Component({
  moduleId: module.id,
  selector: 'df-item',
  templateUrl: 'item.component.html',
})
export class ItemComponent {
  @Input() item: ItemBase<any> = <any>{};
  @Input() form: FormGroup = <any>{};

  controlRendered:boolean = true;

  constructor() {

  }

  ngOnInit() {
    if(this.item.changeListener) {
      let listener = this.item.changeListener;
      listener.forEach((listener) => {
        console.log('listener: ', listener, this.form.get(listener.controls[0]));
        //fake cb
        listener.cb = getIsRendered;

        let otherChanges$ = this.form.get(listener.controls[0]).valueChanges;

        otherChanges$.subscribe(change => {
          console.log('listener change: ' + change);
          console.log('item: ', this.item);
          this.controlRendered = listener.cb(change,listener.params, this.item, this.form);
        });

        /////////////////

        function getIsRendered(change,param, item, form) {
          let controlTypesTypes = param;
          console.log('controlTypesTypes: ', controlTypesTypes, controlTypesTypes.indexOf(change) !== -1);
          return controlTypesTypes.indexOf(change) !== -1;
        }
      });
      //this.subscribePaymentTypeChanges(this.item, this.form);
    }
  }

  //ngOnChanges() {}

  subscribePaymentTypeChanges(item, form) {
    console.log('item: ', form.get(item.key));

    if (item.key == 'type') {

      const otherChanges$ = form.get('controlType').valueChanges;
      //console.log('otherChanges$', otherChanges$);
      otherChanges$
      //.map((value) => { return {key: item.key, value: value}; })
        .subscribe(change => {
          let textboxTypes = ['text', 'number', 'date'];

          if(change == 'textbox') {
            item.options = item.options.map((option) => {option.value = option.value + '.'; return option});
          }
          console.log('change: ' + change);
          console.log('options: ', this.item);
        });
    }
  }

  isLabelVisible(): boolean {
    return !!this.item.label;
  }

  getWrapperClass(): string {
    /*let displayWarning = function() => {
     return this.item.value !== 'te';
     };*/

    let classNames: Array<string> = [];
    if (this.item.controlType === 'radio' || this.item.controlType === 'checkbox') {
      classNames.push('form-check');
    }
    else {
      classNames.push('form-group');
    }

    if (this.form.get(this.item.key).valid) {
      classNames.push('has-success');
    }

    /*if(displayWarning()) {
     classNames.push('has-warning');
     }*/

    if (!this.form.get(this.item.key).valid) {
      classNames.push('has-danger');
    }

    return classNames.join(' ');

  }

  isControlTypeVisible(controlType: string): boolean {
    return this.item.controlType === controlType;
  }

  getControlClass(): string {
    let classNames: string = "";
    if (this.item.controlType === 'radio' || this.item.controlType === 'checkbox') {
      classNames = 'form-check-input';
    }
    else {
      classNames = 'form-control';
    }
    return classNames;
  }

  isError() {
    console.log('this.form.get: ', this.form.get(this.item.key));
    return true;
  }

}
