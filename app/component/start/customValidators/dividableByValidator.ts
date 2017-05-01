import {FormControl, Validator, ValidationErrors, AbstractControl} from "@angular/forms";

export class dividableByValidator implements Validator{

  validate(c: AbstractControl): ValidationErrors|any {

      return (Math.random() > 0.5) ? {
        validateEmail: {
          valid: true
        }
      } : {
        validateEmail: {
          valid: false
        }
      };

  }


}
