import {ValidationErrors, AbstractControl} from "@angular/forms";

export function promiseValidator(c:AbstractControl): Promise<ValidationErrors | null>  {
  return new Promise(resolve => {
    setTimeout(() => {
      if( c.value !== "test" ) {
        resolve({
          promiseInvalid: true
        })
      } else {
        resolve(null);
      }
    }, 2000);
  })
}
