import {placeholderChar as defaultPlaceholderChar} from "./constants";

export const emptyArray: any[] = [];

export const strCaretTrap: string = '[]';

export function convertMaskToPlaceholder(mask: (RegExp | string)[] = emptyArray, placeholderChar: string = defaultPlaceholderChar) {
  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error(
      'Placeholder character must not be used as part of the mask. Please specify a character ' +
      'that is not present in your mask as your placeholder character.\n\n' +
      `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
      `The mask that was received is: ${JSON.stringify(mask)}`
    )
  }

  return mask.map((char) => {
    return (char instanceof RegExp) ? placeholderChar : char
  }).join('')
}

export function isString(value: any) {
  return typeof value === 'string' || value instanceof String
}

export function isNumber(value: any) {
  return typeof value === 'number' && value.toString().length === undefined && !isNaN(value)
}

export function processCaretTraps(mask: (RegExp | string)[]) {
  const indexes: number[] = [];

  let indexOfCaretTrap;
  while (indexOfCaretTrap = mask.indexOf(strCaretTrap), indexOfCaretTrap !== -1) {
    indexes.push(indexOfCaretTrap);

    mask.splice(indexOfCaretTrap, 1)
  }

  return {maskWithoutCaretTraps: mask, indexes}
}
