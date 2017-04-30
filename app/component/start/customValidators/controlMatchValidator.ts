import {FormControl, AbstractControl} from "@angular/forms";

export function controlMatch(control: AbstractControl, controlPathList:string[]): {[key: string]: boolean} => {
  console.log('controlMatch: ', control, controlPathList);

  const email = control.get('email');
  const confirm = control.get('confirm');

  if (!email || !confirm) return null;
  if (email.value === confirm.value) {
    return null;
  }
};
