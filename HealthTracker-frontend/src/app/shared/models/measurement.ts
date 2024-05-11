import { MeasurementType } from "./measurement-type";

export interface NewMeasurement {
  type: string,
  date: Date,
  values: number[],
  comment: string,
}

export interface Measurement {
  type: MeasurementType,
  date: Date,
  values: number[],
  comment: string,
  user: string
}
