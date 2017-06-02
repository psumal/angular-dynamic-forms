export interface IAdjustCaretPositionOptions {
  previousConformedValue : string,
  previousPlaceholder : string,
  currentCaretPosition : number,
  conformedValue:string,
  rawValue:string,
  placeholderChar:string,
  placeholder:string,
  indexesOfPipedChars : number[],
  caretTrapIndexes : number[]
}
