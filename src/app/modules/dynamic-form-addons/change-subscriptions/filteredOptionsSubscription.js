"use strict";
function filteredOptions(change, params, item, form) {
  //determine options to filter
  var filterConfig = params.filter(function (param) {
    return change == param['key'];
  }).pop();
  item.visibleOptions = item.options.filter(function (option) {
    if (filterConfig && 'optionsKeys' in filterConfig) {
      return filterConfig.optionsKeys.indexOf(option.value) !== -1;
    }
    return false;
  });
}
exports.filteredOptions = filteredOptions;
//# sourceMappingURL=filteredOptionsSubscription.js.map
