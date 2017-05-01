import {AbstractControl} from "@angular/forms";

export function controlMatch(formGroup: AbstractControl, params: any) {

  console.log('params: ', formGroup.value);

  let values = params.filter((formPath: any) => {
    console.log('formPath: ',formPath);
    const item = formGroup.get(formPath);
    if (item && item.value) {
      console.log('item.value: ',formPath.join('.'), item.value);
      return true;
    }
    return false;
  })

  console.log('values filtered', values);

  values = values.map((formPath) => {
    console.log('formPath .value: ',formGroup.get(formPath).value);
    return formGroup.get(formPath).value;
  });

  console.log('values', values);

  let isValid = values.every(
    (value, _, array) => {
      console.log('every: ', value, _, array);
      return array[0] === value;
    }
  );

  console.log('isValid', isValid);


  if (!values || values.length == 0) return null;
  return isValid ? null : {controlMatch: true};


};
