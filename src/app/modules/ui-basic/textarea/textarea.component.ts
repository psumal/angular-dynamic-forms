import { Component, ElementRef} from '@angular/core';

import { DynamicFormElementService } from '../../dymanic-form-element/dynamic-form-element.service';
import { ValueChangeSubscriptionService } from '../../value-change-subscriptions/value-change-subscription.service';
import { BaseUiComponent } from '../base/base.component';


@Component({
  inputs: ['config', 'group'],
  selector: 'df-textbox',
  templateUrl: './textarea.component.html',
})
export class TextareaComponent extends BaseUiComponent {
  static controlTypes = ['textarea'];

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
    set('autoComplete', this.config.attrs['autoComplete']);
    set('aria-describedby', this.config.attrs['aria-describedby']);
    set('disabled', this.config.attrs['disabled'], true);
    set('tabindex', this.config.attrs['tabindex']);
    set('autofocus', this.config.attrs['autofocus']);
    set('name', this.config.attrs['kez']);
    set('ngClass', this.config.attrs['ngClass']);
    set('placeholder', this.config.attrs['placeholder']);
    set('readonly', this.config.attrs['readonly'], true);
    set('required', this.config.attrs['required'], true);
    set('spellcheck', this.config.attrs['spellcheck']);
    set('type', this.config.attrs['type']);

  }
}
