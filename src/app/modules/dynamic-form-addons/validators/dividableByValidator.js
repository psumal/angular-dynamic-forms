"use strict";
function dividableBy(divider) {
  return function (c) {
    var isValid = (c.value == 0 || (c.value && c.value % divider === 0));
    return isValid ? null : {
      dividableBy: {
        valid: false
      }
    };
  };
}
exports.dividableBy = dividableBy;
//# sourceMappingURL=dividableByValidator.js.map
