import {Component, Input, Optional, Inject} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {ItemBase}     from '../item-base';
import {CUSTOM_SUBSCRIPTIONS} from "../../../../component/start/customSubscriptions/customSubscriptions.module";
@Component({
  moduleId: module.id,
  selector: 'df-item',
  templateUrl: 'item.component.html',
})
export class ItemComponent {
  @Input() item: ItemBase<any> = <any>{};
  @Input() form: FormGroup = <any>{};

  controlRendered:boolean = true;

  constructor(@Optional() @Inject(CUSTOM_SUBSCRIPTIONS) private CUSTOM_SUBSCRIPTIONS: Array<any>,) {
    console.log('this.CUSTOM_SUBSCRIPTIONS', this.CUSTOM_SUBSCRIPTIONS);

  }

  getCustomSubscriptionFn(validatorName: string):any | undefined {

    let subscriptionFn;

    if (this.CUSTOM_SUBSCRIPTIONS) {

      subscriptionFn = this.CUSTOM_SUBSCRIPTIONS.find(subscriptions => {
        console.log('subscriptions.name: ', validatorName, subscriptions);
        return subscriptions !== undefined;
      });
    }

    console.log('subscriptionFn: ', subscriptionFn);
    return subscriptionFn;
  }

  ngOnInit() {
    console.log('itemcomp ngOnInit ', this.item);
    if(this.item.changeListener) {
      let listener = this.item.changeListener;
      listener.forEach((listener) => {
        //fake cb
        let i = 0;
        console.log(this.getCustomSubscriptionFn('subscribeIsRendered'));

        listener.cb = this.getCustomSubscriptionFn(listener.name);


        console.log("listener.cb: ", listener.cb);

        /* */
        //listener.cb = getIsRendered;

        let otherChanges$ = this.form.get(listener.controls[i]).valueChanges;

        otherChanges$.subscribe(change => {
          console.log('listener change: ' + change);
          console.log('item: ', this.item);

          this.controlRendered = listener.cb(change,listener.params, this.item, this.form);
        });

        /////////////////

        function getFilteredOptions(change?:any,params?:any, item?:any, form?:any) {
          console.log('getFilteredOptions params: ', params);
          let filterConfig = params.filter((param:any) => {
            return change == param['key'];
          }).pop();

          item.options = item.initialOptions.filter((option:any) => {
            if(filterConfig && 'optionsKeys' in filterConfig) {
              return filterConfig.optionsKeys.indexOf(option.value) !== -1;
            }
            return false;
          });

        }
      });
      //this.subscribePaymentTypeChanges(this.item, this.form);
    }
  }

  //ngOnChanges() {}

  subscribePaymentTypeChanges(item:any, form:any) {
    console.log('item: ', form.get(item.key));

    if (item.key == 'type') {

      const otherChanges$ = form.get('controlType').valueChanges;
      //console.log('otherChanges$', otherChanges$);
      otherChanges$
      //.map((value) => { return {key: item.key, value: value}; })
        .subscribe((change:any) => {
          let textboxTypes = ['text', 'number', 'date'];

          if(change == 'textbox') {
            item.options = item.options.map((option:any) => {option.value = option.value + '.'; return option});
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
