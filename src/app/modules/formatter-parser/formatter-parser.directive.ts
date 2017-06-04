import {
  Directive,
  ElementRef,
  forwardRef,
  Host,
  HostListener,
  InjectionToken,
  OnInit,
  Optional,
  SkipSelf
} from "@angular/core";
import {ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DynamicFormElementModel} from "../dymanic-form-element/model/base/form-control";
import {FormatterParserService} from "./formatter-parser.service";
import {IFormatterParserFn} from "./struct/formatter-parser-function";

const CONTROL_VALUE_ACCESSOR = {
  name: 'formatterParserValueAccessor',
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormatterParserDirective),
  multi: true
};

export const FORMATTER_PARSER: InjectionToken<(IFormatterParserFn)[]> = new InjectionToken<(IFormatterParserFn)[]>('formatterParser');

const TEXT_MASK: InjectionToken<Function> = new InjectionToken<Function>('text-mask');

@Directive({
  inputs: ['config', 'formControlName'],
  selector: '[formatterParser]',
  providers: [
    CONTROL_VALUE_ACCESSOR,
    {provide: TEXT_MASK, useValue: ''}
  ]
})
export class FormatterParserDirective implements ControlValueAccessor, OnInit {

  // Input binding
  config: DynamicFormElementModel;
  // Input binding
  formControlName: string;

  // Container component reference
  formControl: FormControl;

  protected formatterParserView: Function[] = [];
  protected formatterParserModel: Function[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  constructor(private _elementRef: ElementRef,
              private fps: FormatterParserService,
              //BIG THX to https://github.com/SanderElias for this hint
              @Optional() @Host() @SkipSelf() private fcd: ControlContainer) {
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  ngOnInit(): void {
    this.formControl = (<any>this.fcd).form.controls[this.formControlName];
    this.updateFormatterAndParser();

  }

  // Parser: View to Model
  @HostListener('input', ['$event'])
  onControlInput($event: KeyboardEvent) {

    console.log('onControlInput: ', $event);
    const input = $event.target as HTMLInputElement;
    const rawValue: any = input.value;

    //write value to view (visible text of the form control)
    input.value = this.formatterParserView.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);

    //write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);
    this.onModelChange(modelValue);
  }

  // Formatter: Model to View
  writeValue(rawValue: any): void {
    const input: HTMLInputElement = this._elementRef.nativeElement;
    //write value to view (visible text of the form control)
    input.value = rawValue;//this.formatterParserView.reduce((state:any, transform: IFormatterParserFn) => transform(state).result, value);

    //write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue);
    // prevent cyclic function calls @TODO consider other way to call patchValue
    if (rawValue !== modelValue) {
      this.formControl.patchValue(modelValue);
    }
  }

  //fetch formatter and parser form config and update props
  updateFormatterAndParser(): void {

    this.formatterParserView = [];
    this.formatterParserModel = [];

    if (!this.config) {
      return;
    }

    if ('formatterParser' in this.config) {
      //setup formatterParser functions for view and model values
      this.config.formatterParser
        .forEach((formatterConfig: any) => {
          const targetBoth: number = 2;
          const fPF: IFormatterParserFn = this.fps.getFormatParseFunction(formatterConfig.name, formatterConfig.params);
          const t = (formatterConfig.target === undefined) ? targetBoth : formatterConfig.target;

          if ((t == 0 || t == 2)) {
            this.formatterParserView.push(fPF);
          }
          if (t == 1 || t == 2) {
            this.formatterParserModel.push(fPF);
          }
        });
    }

  }

}
