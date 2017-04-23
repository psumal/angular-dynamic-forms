export function filteredOptions(change?:any,params?:any, item?:any, form?:any):any {
  console.log('filteredOptions', change, params);
  //determine options to filter
  let filterConfig = params.filter((param: any) => {
    return change == param['key'];
  }).pop();
  console.log('filterConfig', filterConfig);
  console.log('visibleOptions', item.visibleOptions);
  item.visibleOptions = item.options.filter((option: any) => {
    console.log('option', option);
    if (filterConfig && 'optionsKeys' in filterConfig) {
      return filterConfig.optionsKeys.indexOf(option.value) !== -1;
    }
    return false;
  })

};
