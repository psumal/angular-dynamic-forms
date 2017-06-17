import { Component, ElementRef} from '@angular/core';

import { DynamicFormElementService } from '../../dymanic-form-element/dynamic-form-element.service';
import { ValueChangeSubscriptionService } from '../../value-change-subscriptions/value-change-subscription.service';
import { BaseUiComponent } from '../base/base.component';


@Component({
  inputs: ['config', 'group'],
  selector: 'df-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent extends BaseUiComponent {
  static controlTypes = ['radio'];

  constructor(protected _elementRef: ElementRef,
              dfes: DynamicFormElementService,
              vcss: ValueChangeSubscriptionService) {
        super(dfes, vcss);
  }

  getHostClass() {
    let classNames: string[] = super.getHostClass().split(' ');

    classNames.push('form-radio');

    return classNames.join(' ');
  }

  getControlClass(): string {
    let classNames: string[] = ['form-radio'];

    return classNames.join(' ');
  }

  private updateAttributes() {
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
