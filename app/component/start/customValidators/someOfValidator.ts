import {FormControl, ValidatorFn, AbstractControl} from "@angular/forms";

export function someOf(params: any, numOfMatches:number): ValidatorFn {


  return (formGroup: AbstractControl) => {

    if(params.length < 2) {return null; }

    numOfMatches = (numOfMatches > params.length)?params.length:numOfMatches;
    numOfMatches = (numOfMatches > 1)?numOfMatches:2;

    let values = params
      .filter((formPath: any) => {
        console.log('formPath:', formPath);
        const item = formGroup.get(formPath);
        return !!(item && item.value);
      })
      .map((formPath: string[]) => {
        return formGroup.get(formPath).value;
      });

    console.log('values: ', values, values.length, numOfMatches);

    return (values.length >= numOfMatches) ? null : {someOf: true};

  }
};
