import mongoose, {Document, Model, Schema} from "mongoose";

interface IMeasurement extends Document {
  type: string,
  date: Date,
  values: number[],
  comment: string
}

const MeasurementSchema: Schema<IMeasurement> = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, required: true },
  values: [{ type: Number, required: true }],
  comment: { type: String }
});

export const Measurement: Model<IMeasurement> = mongoose.model("Measurement", MeasurementSchema);
