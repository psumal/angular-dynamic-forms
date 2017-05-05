import {Directive, HostListener, forwardRef, Renderer, ElementRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


const CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InteractionHandlerDirective),
  multi: true
};


@Directive({
  selector: '[interactionHandler]',
  providers:[CONTROL_ACCESSOR]
})
export class InteractionHandlerDirective implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }


  blur() {
    this.onTouched();
  }

  // Parser: View --> Ctrl
  @HostListener('input', ['$event'])
  input($event) {

    let input = $event.target as HTMLInputElement;
    let value:string = $event.target.value.toString();
    console.log('input', value);
    // Write back to model
    if (value) {
      value = value.split(' ').join('');
      input.value = value;
    }

    this.onChange(value);
  }

  // Formatter: Ctrl --> View
  writeValue(value: any): void {

    // Write to view
    if (value) {
      value = value.replace(' ', '');
    } else {
      value = '';
    }

    console.log('write', value);

    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);

  }

/*
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    let input = event.target as HTMLInputElement;

    //input.value = input.value.toString().replace('-', '?');

    console.log(input.value);

  }
*/
}
