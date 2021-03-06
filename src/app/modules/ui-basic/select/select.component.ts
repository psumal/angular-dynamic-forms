import { Component, ElementRef, OnInit } from '@angular/core';

import { DynamicFormElementService } from '../../dymanic-form-element/dynamic-form-element.service';
import { ValueChangeSubscriptionService } from '../../value-change-subscriptions/value-change-subscription.service';
import { BaseUiComponent } from '../base/base.component';


@Component({
  inputs: ['config', 'group'],
  selector: 'df-select',
  templateUrl: './select.component.html',
})
export class SelectComponent extends BaseUiComponent {

  static controlTypes = ['select'];

  constructor(protected _elementRef: ElementRef,
              dfes: DynamicFormElementService,
              vcss: ValueChangeSubscriptionService) {
        super(dfes, vcss);
  }

  getHostClass() {
    let classNames: string[] = super.getHostClass().split(' ');

    classNames.push('form-group');

    return classNames.join(' ');
  }

  getControlClass(): string {
    let classNames: string[] = ['form-control'];

    return classNames.join(' ');
  }

  isNoOptPresent() {
    return 'noOptKey' in this.config && !!this.config['noOptKey'];
  }

  getNoOptText() {

    let text: string = '-- noOpt --';

    if ('noOptKey' in this.config && this.config['noOptKey'] && this.config['noOptKey'] !== '') {
      text = this.config['noOptKey'];
    }

    return text;
  }

  updateAttributes() {
    const el: any = this._elementRef.nativeElement;

    let set = (attr: string, value: any, isBoolAttr?: boolean) => {

      if (isBoolAttr) {
        !!value ? el.setAttribute(attr, '') : el.removeAttribute(attr);
        return;
      }

      value === undefined ? el.removeAttribute(attr) : el.setAttribute(attr, value);
    };

    set('accept', this.config.attrs['accept']);
    set('aria-describedby', this.config.attrs['aria-describedby']);
    set('disabled', this.config.attrs['disabled'], true);
    set('tabindex', this.config.attrs['tabindex']);
    set('autofocus', this.config.attrs['autofocus']);
    set('name', this.config.attrs['kez']);
    set('ngClass', this.config.attrs['ngClass']);
    set('readonly', this.config.attrs['readonly'], true);
    set('required', this.config.attrs['required'], true);
    set('type', this.config.attrs['type']);

  }
}
