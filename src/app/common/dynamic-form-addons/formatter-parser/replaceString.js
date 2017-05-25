"use strict";
function replaceString(searchValue, replaceValue) {
  return function (value) {
    var replacedValue = value.replace(searchValue, replaceValue);
    return replacedValue;
  };
}
exports.replaceString = replaceString;
//# sourceMappingURL=replaceString.js.map
