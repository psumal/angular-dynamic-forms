export interface ISelectOption {
  label: string;
  value?: any;
  disabled?: boolean;
  options?: ISelectOption[]
}
