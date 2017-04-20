import {FormControl} from "@angular/forms";

export function validateEmail(c: FormControl) {

  return (Math.random() > 0.5) ? {
    validateEmail: {
      valid: true
    }
  } : {
    validateEmail: {
      valid: false
    }
  };
};
