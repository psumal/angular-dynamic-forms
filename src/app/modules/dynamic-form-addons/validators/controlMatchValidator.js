"use strict";
function controlMatch(params) {
  return function (formGroup) {
    var values = params
      .filter(function (formPath) {
        var item = formGroup.get(formPath);
        return !!(item && item.value);
      })
      .map(function (formPath) {
        return formGroup.get(formPath).value;
      });
    var isValid = values.every(function (value, _, array) {
      return array[0] === value;
    });
    if (!values || values.length == 0)
      return null;
    return isValid ? null : {controlMatch: true};
  };
}
exports.controlMatch = controlMatch;
//# sourceMappingURL=controlMatchValidator.js.map
