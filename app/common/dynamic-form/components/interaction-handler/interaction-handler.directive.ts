import {Directive, HostListener, forwardRef, ElementRef, Inject, Optional, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FORMATTER_PARSER, FormatParseFn} from "../../injects/formatterParser";
import {AbstractFormControlModel} from "../../model/base/form-control";
import {ChangeSubscriptionFn, ChangeSubscriptions, CHANGE_SUBSCRIPTIONS} from "../../injects/changeSubscriptions";


@Directive({
  inputs: ['config', 'group'],
  selector: '[interactionHandler]'
})
export class InteractionHandlerDirective implements OnInit {

  config: AbstractFormControlModel;
  group: any;

  subscriptions: any[];

  constructor(private _elementRef: ElementRef,
              @Optional() @Inject(CHANGE_SUBSCRIPTIONS) private CHANGE_SUBSCRIPTIONS: ChangeSubscriptionFn<any>[]) {

  }

  ngOnInit(): void {

  }

  initSubscriptionFunctions() {
    if (this.config.changeListener) {
      const listener = this.config.changeListener;
      listener.forEach((listener) => {

        const subscriptionFn: ChangeSubscriptionFn<any> = this.getSubscriptionFn(listener.name);
        const otherChanges$ = this.group.get(listener.controls[0]).valueChanges;

        this.subscriptions.push(
          otherChanges$.subscribe((change:any) => {
            <null>subscriptionFn(change, listener.params, this.config, this.group);
          })
        );

        }
      );
    }
  }

  updateAttributes() {
    const el: any = this._elementRef.nativeElement;

    let set = (attr: string, value: any, isBoolAttr?: boolean) => {

      if(isBoolAttr) {
        !!value?el.setAttribute(attr, ''):el.removeAttribute(attr);
        return;
      }

      value === undefined ? el.removeAttribute(attr):el.setAttribute(attr, value);
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

  getChangeSubscriptionFn(subscriptionName: string): ChangeSubscriptionFn<any> | undefined {
    let subscriptionFn;

    if (this.CHANGE_SUBSCRIPTIONS) {
      subscriptionFn = this.CHANGE_SUBSCRIPTIONS.find(subscriptionFn => {
        return subscriptionName === subscriptionFn.name;
      });
    }

    return subscriptionFn;
  }

  getSubscriptionFn(subscriptionName: string): ChangeSubscriptionFn<any> | never {
    let subscriptionFn = ChangeSubscriptions[subscriptionName] || this.getChangeSubscriptionFn(subscriptionName);

    if (!(typeof subscriptionFn === "function")) {
      throw new Error(`validator "${subscriptionName}" is not provided via CHANGE_SUBSCRIPTIONS`);
    }

    return subscriptionFn;
  }

}
