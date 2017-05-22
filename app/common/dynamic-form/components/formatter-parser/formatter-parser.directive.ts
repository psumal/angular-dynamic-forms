import {Directive, HostListener, forwardRef, ElementRef, Inject, Optional, OnInit, HostBinding} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormGroup} from "@angular/forms";
import {FORMATTER_PARSER, FormatParseFn} from "../../injects/formatterParser";
import {AbstractFormControlModel} from "../../model/base/form-control";

const CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormatterParserDirective),
  multi: true
};

@Directive({
  inputs: ['config', 'group'],
  selector: '[select]',
  providers: [
    CONTROL_ACCESSOR]
})
export class FormatterParserDirective implements ControlValueAccessor, OnInit {

  config: AbstractFormControlModel;
  group: FormGroup;

  formatterParserView: Function[] = [];
  formatterParserModel: Function[] = [];

  onChange = (value: any) => {
    return value;
  };
  onTouched = () => {
  };

  constructor(private elementRef: ElementRef,
              @Optional() @Inject(FORMATTER_PARSER) private FORMATTER_PARSER: FormatParseFn[]) {
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
    this.updateFormatterAndParser();
  }

  // Parser: View --> Model
  @HostListener('change', ['$event'])
  onControlInput($event: KeyboardEvent) {
    const input = $event.target as HTMLInputElement;
    const value: string = input.value.toString();

    //write value to view
    input.value = this.formatterParserView.reduce((state, transform) => transform(state), value);

    //write value to model
    const modelValue = value ? value:null;
    this.onChange(modelValue);

  }

  // Formatter: Model --> View
  writeValue(value: any): void {
      const input: HTMLInputElement = this.elementRef.nativeElement;

      //write value to view
      input.value = this.formatterParserView.reduce((state, transform) => transform(state), value);

      //write value to model
      const modelValue = this.formatterParserModel.reduce((state, transform) => transform(state), value);
      this.group.patchValue(modelValue);
  }

  /* Formatter And Parser */
  updateFormatterAndParser() {
    if (!this.config) { return }

    if ('formatterParser' in this.config) {
      //setup formatterParser functions for view and model values
      this.config.formatterParser
        .forEach((formatterConfig: any) => {
          const fPF: any = this.getFormatParseFunction(formatterConfig.name, formatterConfig.params);
          const t = formatterConfig.target;

          if (t == 0 || t == 2) { this.formatterParserView.push(fPF); }
          if (t == 1 || t == 2) { this.formatterParserModel.push(fPF); }
        });
    }
  }

  getFormatParseFunction(functionName: string, params: any[]): FormatParseFn | undefined {
    let formatParseFunction: Function;

    if (this.FORMATTER_PARSER) {
      formatParseFunction = this.FORMATTER_PARSER.find(formParsFunc => {
        return functionName === formParsFunc.name;
      });
    } else {
      throw new Error(`No function provided via FORMATTER_PARSER`);
    }

    if (!(typeof formatParseFunction === "function")) {
      throw new Error(`Formatter or Parser with name ${functionName} is not provided via FORMATTER_PARSER.`);
    }

    return (formatParseFunction) ? formatParseFunction(...params) : formatParseFunction;
  }

}
