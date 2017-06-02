export interface IMaskConfigOptions {
  mask?: string | (RegExp | string)[] | Function
  guide?: boolean,
  placeholderChar?: string,
  keepCharPositions?: boolean,
  pipe?: Function,
  showMask?: false,
  placeholder?: string,
  previousConformedValue?: string,
  currentCaretPosition?: boolean,
}

export interface IConformToMaskConfigOptions {
  guide?: boolean,
  placeholderChar?: string,
  keepCharPositions?: boolean,
  placeholder?: string,
  previousConformedValue?: string,
  currentCaretPosition?: boolean
}

export interface IConformToMaskResult {
  conformedValue: string,
  meta: {
    someCharsRejected: any
  }
}
