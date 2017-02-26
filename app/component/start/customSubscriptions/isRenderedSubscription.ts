import {FormControl} from "@angular/forms";

export const subscribeIsRendered = function (change?:any,param?:any, item?:any, form?:any) {
  console.log('subscribeIsRendered', change);
  let controlTypes = param;
  return controlTypes.indexOf(change) !== -1;
};
