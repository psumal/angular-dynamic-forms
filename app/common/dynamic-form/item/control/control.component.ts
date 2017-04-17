import {Component, Input, Optional, Inject} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {CUSTOM_SUBSCRIPTIONS} from "../../../../component/start/customSubscriptions/customSubscriptions.module";
import {AbstractFormControlModel} from "../../model/base/form-control";
@Component({
  moduleId: module.id,
  selector: 'df-item',
  templateUrl: 'control.component.html',
})
export class ControlComponent {
  @Input() config: AbstractFormControlModel<any> = <any>{};
  @Input() form: FormGroup = <any>{};

  controlRendered:boolean = true;

  constructor(@Optional() @Inject(CUSTOM_SUBSCRIPTIONS) private CUSTOM_SUBSCRIPTIONS: Array<any>) {
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

    if(this.config.changeListener) {
      let listener = this.config.changeListener;
      listener.forEach((listener) => {
        //fake cb
        let i = 0;
        listener.cb = this.getCustomSubscriptionFn(listener.name);

        let otherChanges$ = this.form.get(listener.controls[i]).valueChanges;

        otherChanges$.subscribe(change => {
          this.controlRendered = listener.cb(change,listener.params, this.config, this.form);
        });

      }

      );
      //this.subscribePaymentTypeChanges(this.item, this.form);
    }
  }

  //ngOnChanges() {}

  subscribePaymentTypeChanges(item:any, form:any) {
    console.log('config: ', form.get(item.key));

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
          console.log('options: ', this.config);
        });
    }
  }

  isLabelVisible(): boolean {
    return !!this.config['label'];
  }

  getWrapperClass(): string {
    /*let displayWarning = function() => {
     return this.item.value !== 'te';
     };*/

    let classNames: Array<string> = [];
    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames.push('form-check');
    }
    else {
      classNames.push('form-group');
    }

    if (this.form.get(this.config.key).valid) {
      classNames.push('has-success');
    }

    /*if(displayWarning()) {
     classNames.push('has-warning');
     }*/

    if (!this.form.get(this.config.key).valid) {
      classNames.push('has-danger');
    }

    return classNames.join(' ');

  }

  isControlTypeVisible(controlType: string): boolean {
    return this.config.controlType === controlType;
  }

  getControlClass(): string {
    let classNames: string = "";
    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames = 'form-check-input';
    }
    else {
      classNames = 'form-control';
    }
    return classNames;
  }

  isError() {
    console.log('this.form.get: ', this.form.get(this.config.key));
    return true;
  }

}
