"use strict";
function someOf(params, numOfMatches) {
  return function (formGroup) {
    if (params.length < 2) {
      return null;
    }
    numOfMatches = (numOfMatches > params.length) ? params.length : numOfMatches;
    numOfMatches = (numOfMatches > 1) ? numOfMatches : 2;
    var values = params
      .filter(function (formPath) {
        var item = formGroup.get(formPath);
        return !!(item && item.value);
      })
      .map(function (formPath) {
        return formGroup.get(formPath).value;
      });
    return (values.length >= numOfMatches) ? null : {someOf: true};
  };
}
exports.someOf = someOf;
//# sourceMappingURL=someOfValidator.js.map
