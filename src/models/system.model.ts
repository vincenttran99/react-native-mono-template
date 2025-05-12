export interface ISystemSettings {
  maintenance_mode: string;
  [key: string]: string;
}

export interface ILabelValue {
  label: string;
  value: string;
  [key: string]: any;
}
