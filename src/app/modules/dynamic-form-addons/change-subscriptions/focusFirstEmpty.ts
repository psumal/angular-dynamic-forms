export function focusFirstEmpty(changes?: any, params?: any, config?: any, form?: any): any {
  const targetComponents: any = params[0];

  console.log('focusFirstEmpty', targetComponents);
  changes = {...changes};

  for(let change in changes) {
    console.log('change', change);
  }

  return changes;
}
