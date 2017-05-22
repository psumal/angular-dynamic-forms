export function filteredOptions(change?:any,params?:any, item?:any, form?:any):any {
  //determine options to filter
  let filterConfig = params.filter((param: any) => {
    return change == param['key'];
  }).pop();
  item.visibleOptions = item.options.filter((option: any) => {
    if (filterConfig && 'optionsKeys' in filterConfig) {
      return filterConfig.optionsKeys.indexOf(option.value) !== -1;
    }
    return false;
  })

};
