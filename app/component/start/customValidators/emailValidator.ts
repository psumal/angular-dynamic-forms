import {FormControl} from "@angular/forms";

export const validateEmail = function (c: FormControl) {

  return {
    validateEmail: {
      valid: (Math.random() > 0.5)
    }
  };
};
