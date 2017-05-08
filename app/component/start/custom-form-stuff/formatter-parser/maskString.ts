import {FormatParseFn} from "../../../../common/dynamic-form/injects/formatterParser";

export function maskString(mask: string, maskPatterns: {[key: string]: RegExp}): FormatParseFn {
  return (value: any) => {

    value = value || '';
    mask = mask || '';
    maskPatterns = maskPatterns || {};

    var maskedValue: string = '';
    // array representation of string under test
    var valueParts: string[] = value.split('');
    // array representation of the mask
    var maskParts: string[] = mask.split('');

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
        var maskChar: string = maskParts.shift();

        // make sure the masking character exists
        // otherwise this means that the original string
        // exceeds the masking pattern length
        if (maskChar !== undefined) {
          // try to find a pattern for the particular
          // mask character
          var maskPattern: Function | RegExp | boolean = maskPatterns[maskChar.toUpperCase()];

          // if there is no pattern configured for
          // this particular mask character, assume
          // the mask character is a placeholder
          // that must be added to the string
          if (maskPattern !== undefined) {
            var check: boolean = false;

            // mask pattern can be either a function
            if (typeof maskPattern === 'function') {
              check = maskPattern(unmaskedChar);
            }
            // or a regex string
            else if (maskPattern instanceof RegExp) {
              check = maskPattern.test(unmaskedChar);
            }

            // if character has passed the mask check,
            // it can bee added to the final masked value
            if (check) {
              maskedValue += unmaskedChar;
            }
            // otherwise one must put the pattern back into
            // the array so the next character can try to
            // pass the mask check
            else {
              maskParts.unshift(maskChar);
            }

            unmaskedChar = null;
          }
          // mask character is a placeholder / formatting value
          // and must be added to the masked string
          else {
            maskedValue += maskChar;
          }
        }
        // no masking character has been found,
        // the original string is probably longer
        // then the mask pattern and therefore
        // the leftovers can be cut off
        else {
          // reset current character to continue the loop
          unmaskedChar = null;
        }
      }
    }

    return maskedValue;
  }

}
