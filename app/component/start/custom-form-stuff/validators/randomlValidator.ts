import {FormControl} from "@angular/forms";

export function randomValidator(c: FormControl) {
  let rndNr:number = Math.random();
  return (rndNr > 0.5) ? null : {
    randomValidator: {
        actualValue: c.value,
        rndNr : rndNr
    }
  };
};
