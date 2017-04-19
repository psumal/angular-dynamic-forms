export const subscribeFilteredOptions = function(change?:any,params?:any, item?:any, form?:any) {

  let filterConfig = params.filter((param:any) => {
    return change == param['key'];
  }).pop();

  item.options = item.initialOptions.filter((option:any) => {
    if(filterConfig && 'optionsKeys' in filterConfig) {
      return filterConfig.optionsKeys.indexOf(option.value) !== -1;
    }
    return false;
  });

};
