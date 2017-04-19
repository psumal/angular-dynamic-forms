import {FormGroup} from "@angular/forms";
export interface ChangeSubscriptionFn<T> {
  (change?: any, param?: any, item?: any, form?: FormGroup): T;
}


export class ChangeSubscriptions {

  static isRendered(change?: any, param?: any, item?: any, form?: any): void {
    //check if the change is present in
    return param.indexOf(change) !== -1;
  }

  static filteredOptions(change?: any, params?: any, item?: any, form?: any) {

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

  }

}
