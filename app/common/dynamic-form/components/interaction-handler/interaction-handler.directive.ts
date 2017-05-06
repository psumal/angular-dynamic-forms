import {Directive, HostListener, forwardRef, Renderer, ElementRef, Inject, Optional, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FORMATTER_PARSER, FormatParseFn} from "../../injects/formatterParser";
import {AbstractFormControlModel} from "../../model/base/form-control";


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

  config: AbstractFormControlModel<any>;
  group: any;
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  formatterParserView: Function[] = [];
  formatterParserModel: Function[] = [];

  constructor(private _elementRef: ElementRef,
              @Optional() @Inject(FORMATTER_PARSER) private FORMATTER_PARSER: FormatParseFn[]) {

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  blur() {
    this.onTouched();
  }

  ngOnInit(): void {
    this.setFormatterAndParser();
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
    const viewValue:any = this.transformAll(this.formatterParserView, value);
    input.value = viewValue;

    //write value to model
    const modelValue = this.transformAll(this.formatterParserModel, value);
    this.group.setValue(modelValue);
  }

  transformAll(arr: any[], value: any): any {
    let transformedValue:any = value;

    for (let i: number = 0; i < arr.length; i++) {
      transformedValue = arr[i](transformedValue);
    }

    return transformedValue;
  }

  /* Formatter And Parser */
  setFormatterAndParser() {
    if (!this.config) { return }

    if ('formatterParser' in this.config) {
      //setup formatterParser functions for view and model values
      this.config.formatterParser
        .forEach((formatterConfig: any) => {
          const fPF:any = this.getFormatParseFunction(formatterConfig.name, formatterConfig.params);

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
