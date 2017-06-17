import "rxjs/Rx";
import {Observable} from "rxjs/Rx";

import {AbstractControl, ValidationErrors} from "@angular/forms";

export function observableValidator(c: AbstractControl): Observable<ValidationErrors | null> {

  const validatorName =  "observableValidator";

  const routValidation$ = new Observable(observer => {



    if (c.value && typeof c.value === "string" &&
      "asdf".indexOf(c.value.toString()) !== -1) {
      observer.next({
        [this.validationName]: {
          actual: c.value,
          data: 'something'
        }
      });
    } else {
      observer.next(null);
    }
  });

  return routValidation$.debounceTime(500).distinctUntilChanged().delay(2000).first();


}
