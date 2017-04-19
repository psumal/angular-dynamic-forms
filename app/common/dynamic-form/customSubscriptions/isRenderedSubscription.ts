export const subscribeIsRendered = function (change?:any,param?:any, item?:any, form?:any) {
  let controlTypes = param;
  return controlTypes.indexOf(change) !== -1;
};
