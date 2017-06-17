import { Component, ElementRef} from '@angular/core';

import { DynamicFormElementService } from '../../dymanic-form-element/dynamic-form-element.service';
import { ValueChangeSubscriptionService } from '../../value-change-subscriptions/value-change-subscription.service';
import { BaseUiComponent } from '../base/base.component';


@Component({
  inputs: ['config', 'group'],
  selector: 'df-textbox',
  templateUrl: './textbox.component.html',
})
export class TextboxComponent extends BaseUiComponent {
  static controlTypes = ['textbox'];

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
    let classNames: string[] = [];

    if (this.config.controlType === 'textbox' && this.config.inputType === 'file') {
      classNames.push('form-control-file');
    }
    else {
      classNames.push('form-control');
    }

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
    set('list', this.config.attrs['list']);
    set('max', this.config.attrs['max']);
    set('min', this.config.attrs['min']);
    set('multiple', this.config.attrs['multiple'], true);
    set('step', this.config.attrs['step']);
    set('tabindex', this.config.attrs['tabindex']);
    set('autofocus', this.config.attrs['autofocus']);
    set('maxlength', this.config.attrs['maxlength'], true);
    set('minlength', this.config.attrs['minlength'], true);
    set('name', this.config.attrs['kez']);
    set('ngClass', this.config.attrs['ngClass']);
    set('placeholder', this.config.attrs['placeholder']);
    set('readonly', this.config.attrs['readonly'], true);
    set('required', this.config.attrs['required'], true);
    set('spellcheck', this.config.attrs['spellcheck']);
    set('type', this.config.attrs['type']);

  }
}
