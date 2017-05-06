import {Directive, HostListener, forwardRef, ElementRef, Inject, Optional, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FORMATTER_PARSER, FormatParseFn} from "../../injects/formatterParser";
import {AbstractFormControlModel} from "../../model/base/form-control";
import {ChangeSubscriptionFn, ChangeSubscriptions, CHANGE_SUBSCRIPTIONS} from "../../injects/changeSubscriptions";


const CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InteractionHandlerDirective),
  multi: true
};


@Directive({
  inputs: ['config', 'group'],
  selector: '[interactionHandler]',
  providers: [CONTROL_ACCESSOR]
})
export class InteractionHandlerDirective implements ControlValueAccessor, OnInit {

  config: AbstractFormControlModel;
  group: any;

  formatterParserView: Function[] = [];
  formatterParserModel: Function[] = [];

  subscriptions: any[];

  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  constructor(private _elementRef: ElementRef,
              @Optional() @Inject(FORMATTER_PARSER) private FORMATTER_PARSER: FormatParseFn[],
              @Optional() @Inject(CHANGE_SUBSCRIPTIONS) private CHANGE_SUBSCRIPTIONS: ChangeSubscriptionFn[]) {

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('blur', ['$event'])
  onBlur($event: KeyboardEvent) {
    this.onTouched();
  }

  ngOnInit(): void {
    if(['select', 'button', 'formGroup'].indexOf(this.config.controlType) === -1) {
      this.updateFormatterAndParser();
    }
  }

  // Parser: View --> Model
  @HostListener('input', ['$event'])
  onControlInput($event: KeyboardEvent) {
    const input = $event.target as HTMLInputElement;
    const value: string = input.value.toString();

    //write value to view
    const viewValue = this.transformAll(this.formatterParserView, value);
    input.value = viewValue;

    //write value to model
    const modelValue: any = this.transformAll(this.formatterParserModel, value);
    this.onChange(modelValue);

  }

  // Formatter: Model --> View
  writeValue(value: any): void {
    const input: HTMLInputElement = this._elementRef.nativeElement;

    //write value to view
    const viewValue: any = this.transformAll(this.formatterParserView, value);
    input.value = viewValue;

    //write value to model
    const modelValue = this.transformAll(this.formatterParserModel, value);
    this.group.setValue(modelValue);
  }


  initSubscriptionFunctions() {
    if (this.config.changeListener) {
      const listener = this.config.changeListener;
      listener.forEach((listener) => {

        const subscriptionFn: ChangeSubscriptionFn<any> = this.getSubscriptionFn(listener.name);
        const otherChanges$ = this.group.get(listener.controls[0]).valueChanges;

        this.subscriptions.push(
          otherChanges$.subscribe(change => {
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

  getChangeSubscriptionFn(subscriptionName: string): ChangeSubscriptionFn | undefined {
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

  transformAll(arr: any[], value: any): any {
    let transformedValue: any = value;

    for (let i: number = 0; i < arr.length; i++) {
      transformedValue = arr[i](transformedValue);
    }

    return transformedValue;
  }

  /* Formatter And Parser */
  updateFormatterAndParser() {
    if (!this.config) {
      return
    }

    if ('formatterParser' in this.config) {
      //setup formatterParser functions for view and model values
      this.config.formatterParser
        .forEach((formatterConfig: any) => {
          const fPF: any = this.getFormatParseFunction(formatterConfig.name, formatterConfig.params);

          if (formatterConfig.target == 0 || formatterConfig.target == 2) {
            this.formatterParserView.push(fPF);
          }

          if (formatterConfig.target == 1 || formatterConfig.target == 2) {
            this.formatterParserModel.push(fPF);
          }
        });
    }

  }

  getFormatParseFunction(functionName: string, params: any[]): FormatParseFn | undefined {
    let formatParseFunction: Function;

    if (this.FORMATTER_PARSER) {
      formatParseFunction = this.FORMATTER_PARSER.find(component => {
        return functionName === component.name;
      });
    } else {
      throw new Error(`No function provided via FORMATTER_PARSER`);
    }

    if (!(typeof formatParseFunction === "function")) {
      throw new Error(`Component "${formatParseFunction}" with name ${functionName} is not provided via FORMATTER_PARSER.`);
    }

    return (formatParseFunction) ? formatParseFunction(...params) : formatParseFunction;
  }

}
