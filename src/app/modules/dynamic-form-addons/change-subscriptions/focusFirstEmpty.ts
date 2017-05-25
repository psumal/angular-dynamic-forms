export function focusFirstEmpty(changes?: any, params?: any, config?: any, form?: any): any {
  const targetComponents: any = params;

  console.log('focusFirstEmpty', targetComponents, changes, form, config);
  changes = {...changes};

  for(let change in changes) {
    console.log('change', change);
  }

  return changes;
}
