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
import {TextMaskService} from "./text-mask-core/services/textMask.service";

const CONTROL_VALUE_ACCESSOR = {
  name: 'formatterParserValueAccessor',
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormatterParserTextMaskDirective),
  multi: true
};

export const FORMATTER_PARSER: InjectionToken<(IFormatterParserFn)[]> = new InjectionToken<(IFormatterParserFn)[]>('formatterParser');


@Directive({
  inputs: ['config', 'formControlName'],
  selector: '[formatterParser]',
  providers: [
    CONTROL_VALUE_ACCESSOR,
    TextMaskService
  ]
})
export class FormatterParserTextMaskDirective implements ControlValueAccessor, OnInit {

  // Input binding
  config: DynamicFormElementModel;
  // Input binding
  formControlName: string;

  // Container component reference
  formControl: FormControl;

  protected formatterParserView: Function[] = [];
  protected formatterParserModel: Function[] = [];

  constructor(private _elementRef: ElementRef,
              private fps: FormatterParserService,
              //BIG THX to https://github.com/SanderElias for this hint
              @Optional() @Host() @SkipSelf() private fcd: ControlContainer,
              // BIG THX to https://github.com/text-mask/text-mask for the code share
              private tms: TextMaskService) {
  }

  ngOnInit(): void {
    this.formControl = (<any>this.fcd).form.controls[this.formControlName];
    this.updateFormatterAndParser();

  }

  onChange = (value: any) => {
    return value;
  };

  onTouched = () => {
    //not implemented
  };


  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Parser: View to Model
  @HostListener('input', ['$event'])
  onControlInput($event: KeyboardEvent) {
    const input = $event.target as HTMLInputElement;
    const rawValue: any = input.value;

    /* TEXT-MASK EXCEPTION ==============================================================*/

    const fpC = this.config.formatterParser.find(i => (i.name === 'textMask'));
    if (!!fpC) {
      const res = this.tms.update(rawValue, {
        inputElement: input,
        mask: fpC.params[0].mask || '',
        guide: fpC.params[0].guide || false,
        pipe: fpC.params[0].pipe || false,
        placeholderChar: fpC.params[0].placeholderChar || '_',
        keepCharPositions: fpC.params[0].keepCharPositions || false,
        showMask: fpC.params[0].showMask || false,
      });

      if (res) {
        input.value = res.inputElementValue; // set the input value
        this.tms.safeSetSelection(input, res.adjustedCaretPosition) // adjust caret position
      }
    }

    /*============================================================== TEXT-MASK EXCEPTION*/
    else {
      //write value to view (visible text of the form control)
      input.value = this.formatterParserView.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);
    }

    //write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);
    this.onChange(modelValue);
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
