import {FormControl, ValidatorFn} from "@angular/forms";

export function dividableBy(divider: number): ValidatorFn {
  return (c: FormControl) => {

    let isValid = ( c.value == 0 || (c.value && c.value%divider === 0) );

    return isValid ? null : {
      dividableBy: {
        valid: false
      }
    };
  };
}
