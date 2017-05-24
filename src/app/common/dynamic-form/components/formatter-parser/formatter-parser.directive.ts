import {
  Directive, HostListener, forwardRef, ElementRef, OnInit, ViewContainerRef
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from "@angular/forms";
import {AbstractFormControlModel} from "../../model/base/form-control";
import {DynamicFormService} from "../../services/dynamic-form.service";

const CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormatterParserDirective),
  multi: true
};

@Directive({
  inputs: ['config'],
  selector: '[formatterParser]',
  providers: [
    CONTROL_VALUE_ACCESSOR
  ]
})
export class FormatterParserDirective implements ControlValueAccessor, OnInit {

  //input binding
  config: AbstractFormControlModel;
  //container component reference
  formControl: FormControl;

  protected formatterParserView: Function[] = [];
  protected formatterParserModel: Function[] = [];

  constructor(private elementRef: ElementRef,
              private _viewRef: ViewContainerRef,
              private dfs:DynamicFormService) {
    this.formControl = (<any>this._viewRef)._view.component.currentFormItem
  }

  onChange = (value: any) => {
    return value;
  };

  onTouched = () => {

  };

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.updateFormatterAndParser();
  }

  // Parser: View to Model
  @HostListener('input', ['$event'])
  onControlInput($event: KeyboardEvent) {

    const input = $event.target as HTMLInputElement;
    const value: string = input.value.toString();

    //write value to view (visible text of the form control)
    input.value = this.formatterParserView.reduce((state, transform) => transform(state), value || null);

    //write value to model (value stored in NgModel || FormControl)
    const modelValue = this.formatterParserModel.reduce((state, transform) => transform(state), value || null);
    this.onChange(modelValue);
  }

  // Formatter: Model to View
  writeValue(value: any): void {
      const input: HTMLInputElement = this.elementRef.nativeElement;

      //write value to view (visible text of the form control)
      input.value = this.formatterParserView.reduce((state, transform) => transform(state), value);

      //write value to model (value stored in NgModel || FormControl)
      const modelValue = this.formatterParserModel.reduce((state, transform) => transform(state), value);
      this.formControl.patchValue(modelValue);
  }

  //fetch formatter and parser form config and update props
  updateFormatterAndParser():void {

    this.formatterParserView = [];
    this.formatterParserModel = [];

    if (!this.config) { return }

    if ('formatterParser' in this.config) {
      //setup formatterParser functions for view and model values
      this.config.formatterParser
        .forEach((formatterConfig: any) => {
          const fPF: any = this.dfs.getFormatParseFunction(formatterConfig.name, formatterConfig.params);
          const t = formatterConfig.target;

          if (t == 0 || t == 2) { this.formatterParserView.push(fPF); }
          if (t == 1 || t == 2) { this.formatterParserModel.push(fPF); }
        });
    }

  }

}
