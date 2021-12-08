export interface IFilterOption {
  label: string;
  value: IFilterOptionValue;
}

export interface IFilterOptionValue {
  optionId: string;
  dateStart: string;
  ids: string[];
}
