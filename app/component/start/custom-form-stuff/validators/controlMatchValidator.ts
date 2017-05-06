import {ValidatorFn, AbstractControl} from "@angular/forms";

export function controlMatch(params: any): ValidatorFn {

  return (formGroup: AbstractControl) => {

    let values = params
      .filter((formPath: any) => {
        const item = formGroup.get(formPath);
        return !!(item && item.value);
      })
      .map((formPath: string[]) => {
        return formGroup.get(formPath).value;
      });

    let isValid = values.every((value: any, _: any, array: any[]) => {
        return array[0] === value;
      }
    );

    if (!values || values.length == 0) return null;
    return isValid ? null : {controlMatch: true};

  }
};
