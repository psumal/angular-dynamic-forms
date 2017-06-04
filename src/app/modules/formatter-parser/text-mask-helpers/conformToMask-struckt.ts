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
