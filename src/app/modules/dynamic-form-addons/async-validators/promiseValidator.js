"use strict";
function promiseValidator(c) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (c.value !== "test") {
        resolve({
          promiseValidator: true
        });
      }
      else {
        resolve(null);
      }
    }, 2000);
  });
}
exports.promiseValidator = promiseValidator;
//# sourceMappingURL=promiseValidator.js.map
