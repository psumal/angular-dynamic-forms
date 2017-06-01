export function filteredOptions(change?: any, params?: any, item?: any, form?: any): any {
  //determine options to filter
  //check if the change is present in params. If true display it.
  return {
    name: "isRendered",
    result: !!change
  };
}
