import {FormControl} from "@angular/forms";

export function randomValidator(c: FormControl) {
  return (Math.random() > 0.5) ? null : {
    randomValidator: {
      valid: false
    }
  };
};
