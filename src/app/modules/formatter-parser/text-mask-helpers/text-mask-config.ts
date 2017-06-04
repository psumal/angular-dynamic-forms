export interface IPipeResult {
  value: string ,
  rejected: true
}

export interface ITextMaskConfigOptions {
  mask?: string | (string | RegExp)[] | Function
  guide?: boolean
  placeholderChar?: string
  keepCharPositions?: boolean
  pipe?: false | string | Function | IPipeResult
  showMask?: boolean
}

export interface ITextMasResult {
  inputElementValue: string,
  adjustedCaretPosition: number
}
