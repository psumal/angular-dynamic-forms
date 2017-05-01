import {AbstractControl} from "@angular/forms";

export function controlMatch(formGroup: AbstractControl, params:any) {

  console.log('controlMatch', formGroup, params);

  const values = params.filter((formPath:any) => {
    console.log(formPath);
    const item = formGroup.get(formPath);
    if(item && item.value) {
     return true;
    }
    return false;
  });

  console.log('values');


  if (!values || values.length == 0) return null;
  return true ? null : {controlMatch: true};


};
