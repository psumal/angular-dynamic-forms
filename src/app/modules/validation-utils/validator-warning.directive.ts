import {
  Directive,
  ElementRef,
  forwardRef,
  Host,
  HostListener,
  Input,
  OnInit,
  Optional,
  SkipSelf
} from '@angular/core';
import {
  AsyncValidatorFn,
  ControlContainer,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { IValidatorWarningConfig } from './struct/validator-warning-config';
import { ValidationService } from './validation.service';
import { Observable } from 'rxjs/Observable';

const CONTROL_VALUE_ACCESSOR = {
  name: 'validationWarningValueAccessor',
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ValidatorWarningDirective),
  multi: true
};

@Directive({
  selector: '[validatorWarning]',
  providers: [
    CONTROL_VALUE_ACCESSOR
  ],
  exportAs: 'validatorWarning'
})
export class ValidatorWarningDirective implements OnInit {

  @Input('validatorWarning')
  config: IValidatorWarningConfig;

  @Input()
  formControlName: string;
  // Container component reference
  private formControl: FormControl;
  dummyFormControl: FormControl;

  // html input reference
  private inputElement: HTMLInputElement;

  private _warnings: ValidationErrors = {};
  get warnings(): ValidationErrors {
    return this._warnings;
  }
  set warnings(value: ValidationErrors) {
    this._warnings = value;
  }

  statusChanges: Observable<string>;

  invalid:boolean = false;
  valid: boolean = true;

  private onTouch: Function;
  private onModelChange: Function;

  constructor(private _elementRef: ElementRef,
              private vs: ValidationService,
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
    this.inputElement = this.getInputElementRef();
    this.updateValidations();
  }

  // Parser: View to Model
  @HostListener('input', ['$event'])
  onControlInput($event: KeyboardEvent) {
    const rawValue: any = this.inputElement.value;

    // If there is a onTouch function registered
    if (this.onTouch) {
      this.onTouch();
    }

    this.updateWarnings(rawValue);

    // If there is a onModelChange function registered
    if (this.onModelChange) {
      this.onModelChange(rawValue);
    }
  }


  // Formatter: Model to View
  writeValue(rawValue: any): void {

    // If there is a onTouch function registered
    if (this.onTouch) {
      this.onTouch();
    }

    this.updateWarnings(rawValue);

    // If there is a onModelChange function registered
    if (this.onModelChange) {
      this.onModelChange(rawValue);
    }

  }

  // fetch formatter and parser form config and update props
  updateWarnings(value): void {

    if (!this.config || !this.formControl) {
      return;
    }
    this.dummyFormControl.setValue(value);
    console.log(value, this.dummyFormControl);

    this.invalid = this.dummyFormControl.invalid;
    this.valid = this.dummyFormControl.valid;
    this.warnings = this.dummyFormControl.errors;
    console.log('this.warnings', this.warnings);

  }


  // fetch formatter and parser form config and update props
  updateValidations(): void {

    if (!this.config) {
      return;
    }

    const validationFunctions = this.vs.getValidators(this.config.validatorWarning);
    const asyncValidationFunctions = this.vs.getAsyncValidators(this.config.asyncValidatorWarning);
    this.dummyFormControl = new FormControl(this.formControl.value, validationFunctions, asyncValidationFunctions);
    this.statusChanges = this.dummyFormControl.statusChanges;
    this.updateWarnings(this.formControl.value);
  }

  // get a safe ref to the input element
  private getInputElementRef(): HTMLInputElement {
    let input: HTMLInputElement;
    if (this._elementRef.nativeElement.tagName === 'INPUT') {
      // directive is used directly on an input element
      input = this._elementRef.nativeElement;
    } else {
      // directive is used on an abstracted input element, `ion-input`, `md-input`, etc
      input = this._elementRef.nativeElement.getElementsByTagName('INPUT')[0];
    }

    if (!input) {
      throw new Error('You can applied the "formatterParser" directive only on inputs or elements containing inputs');
    }

    return input;
  }

}
