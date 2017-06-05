import "rxjs/Rx";
import {Observable} from "rxjs/Rx";

import {AbstractControl, ValidationErrors} from "@angular/forms";

export function observableValidator(c: AbstractControl): Observable<ValidationErrors | null> {

  const validatorName =  "observableValidator";

  const routValidation$ = new Observable(observer => {
    if ("Tesunddamatoterfklomeisaan".indexOf(c.value.toString()) !== -1) {
      observer.next({
        [this.validationName]: {
          actual: c.value,
          data: 'something'
        }
      });
    } else {
      observer.next();
    }
  });

  return routValidation$.debounceTime(500).distinctUntilChanged().delay(2000).first();


}
