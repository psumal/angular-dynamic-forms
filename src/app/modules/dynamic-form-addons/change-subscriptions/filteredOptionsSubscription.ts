import {ChangeSubscriptionResult} from "../../reactive-utils/value-change-subscriptions-function";
export function filteredOptions(change?: any, params?: any, item?: any, form?: any): ChangeSubscriptionResult {
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

  return {
    key: "filteredOptions",
    result: item.visibleOptions
  };
}
