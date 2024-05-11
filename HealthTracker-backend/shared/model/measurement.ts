import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { MeasurementType } from "./measurement-type";
import { User } from "./user";

interface IMeasurement extends Document {
  type: { type: mongoose.Types.ObjectId },
  date: Date,
  values: number[],
  comment: string,
  user: { type: mongoose.Types.ObjectId }
}

const MeasurementSchema: Schema<IMeasurement> = new mongoose.Schema({
  type: { type: mongoose.Types.ObjectId, ref: MeasurementType },
  date: { type: Date, required: true },
  values: [{ type: Number, required: true }],
  comment: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: User },
});

export const Measurement: Model<IMeasurement> = mongoose.model("Measurement", MeasurementSchema);
