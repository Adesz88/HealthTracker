import { MeasurementType } from "./measurement-type";
import { User } from "./user";

export interface NewMeasurement {
  type: string,
  date: Date,
  values: number[],
  comment: string,
}

export interface UserMeasurement {
  _id: string,
  type: MeasurementType,
  date: Date,
  values: number[],
  comment: string,
  user: string
}

export interface Measurement {
  type: MeasurementType,
  date: Date,
  values: number[],
  comment: string,
  user: User
}
