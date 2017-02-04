import {Component, Input} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {ItemBase}     from './item-base';
@Component({
  moduleId: module.id,
  selector: 'df-item',
  templateUrl: 'item.component.html',
})
export class ItemComponent {
  @Input() item: ItemBase<any>;
  @Input() form: FormGroup;

  ngOnInit() {

    console.log('form: ', this.form);

    console.log('key: ', this.form.get('key'));
  }

  //ngOnChanges() {}

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

    if(this.form.get(this.item.key).valid) {
      classNames.push('has-success');
    }

    /*if(displayWarning()) {
      classNames.push('has-warning');
    }*/

    if(!this.form.get(this.item.key).valid) {
      classNames.push('has-danger');
    }

    return classNames.join(' ');

  }

  isLabelVisible():boolean {
    return !!this.item.label;
  }

  isControlTypeVisible(controlType:string):boolean {
    return this.item.controlType === controlType;
  }

  getControlClass():string {
    let classNames: string = "";
    if (this.item.controlType === 'radio' || this.item.controlType === 'checkbox') {
      classNames = 'form-check-input';
    }
    else {
      classNames = 'form-control';
    }
    return classNames;
  }

  getLabelClass():string {
    let className:string = 'form-check-label';
    //className += this.isError()?' has-error':'';
    return className
  }

  isError() {
    console.log('this.form.get: ', this.form.get(this.item.key));
    return true;
  }


}
