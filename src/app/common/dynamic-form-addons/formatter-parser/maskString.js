"use strict";
function maskString(mask, maskPatterns) {
    return function (value) {
        value = value || '';
        mask = mask || '';
        maskPatterns = maskPatterns || {};
        var maskedValue = '';
        // array representation of string under test
        var valueParts = value.split('');
        // array representation of the mask
        var maskParts = mask.split('');
        // as long as there are still characters left in
        // the original string, one must try to mask them
        while (valueParts.length > 0) {
            // take the first character and remove
            // it from the original string
            var unmaskedChar = valueParts.shift();
            // as long as the character has not been masked
            // one must try to find a masking character
            while (unmaskedChar !== null) {
                // take the first mask character from
                // the mask string
                var maskChar = maskParts.shift();
                // make sure the masking character exists
                // otherwise this means that the original string
                // exceeds the masking pattern length
                if (maskChar !== undefined) {
                    // try to find a pattern for the particular
                    // mask character
                    var maskPattern = maskPatterns[maskChar.toUpperCase()];
                    // if there is no pattern configured for
                    // this particular mask character, assume
                    // the mask character is a placeholder
                    // that must be added to the string
                    if (maskPattern !== undefined) {
                        var check = false;
                        // mask pattern can be either a function
                        if (typeof maskPattern === 'function') {
                            check = maskPattern(unmaskedChar);
                        }
                        else if (maskPattern instanceof RegExp) {
                            check = maskPattern.test(unmaskedChar);
                        }
                        // if character has passed the mask check,
                        // it can bee added to the final masked value
                        if (check) {
                            maskedValue += unmaskedChar;
                        }
                        else {
                            maskParts.unshift(maskChar);
                        }
                        unmaskedChar = null;
                    }
                    else {
                        maskedValue += maskChar;
                    }
                }
                else {
                    // reset current character to continue the loop
                    unmaskedChar = null;
                }
            }
        }
        return maskedValue;
    };
}
exports.maskString = maskString;
//# sourceMappingURL=maskString.js.map