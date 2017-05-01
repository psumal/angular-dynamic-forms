import {Observable} from "rxjs";
import { ValidationErrors, AbstractControl} from "@angular/forms";

export function observableValidator(c: AbstractControl): Observable<ValidationErrors | null>  {

  return new Observable(observer => {
    if( c.value === "test" ) {
      observer.next({observableInvalid: true});
    } else {
      observer.next(null);
    }
  });

};
