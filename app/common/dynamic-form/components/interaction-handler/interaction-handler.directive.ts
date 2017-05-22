import {Directive, ElementRef, Inject, Optional, OnInit, EventEmitter} from "@angular/core";
import {AbstractFormControlModel} from "../../model/base/form-control";
import {ChangeSubscriptionFn, ChangeSubscriptions, CHANGE_SUBSCRIPTIONS} from "../../injects/changeSubscriptions";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import 'rxjs/Rx'
import {Observable} from "rxjs/Rx";

@Directive({
  inputs: ['config', 'group'],
  outputs: ['valueSubscriptionChanged'],
  selector: '[interactionHandler]',
  exportAs:'interactionHandl'
})
export class InteractionHandlerDirective implements OnInit {

  config: AbstractFormControlModel;
  group: FormControl | FormGroup;

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit(): void {}

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
