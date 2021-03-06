import {ValueChangeSubscriptionFn} from "./value-change-subscriptions-function";
export class ValueChangeSubscriptions {

  static isRendered: ValueChangeSubscriptionFn = (change: any, params: any): any => {
    //check if the change is present in params. If true display it.

    return {
      name: "isRendered",
      result: !!change
    };
  };

  static filteredOptions: ValueChangeSubscriptionFn = (change?: any, params?: any, item?: any, form?: any): any => {
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
      name: "filteredOptions",
      result: item.visibleOptions
    };
  }

}

