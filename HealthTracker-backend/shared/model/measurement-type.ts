import mongoose, {Document, Model, Schema} from "mongoose";

interface IMeasurementType extends Document {
  name: string,
  values: string[],
}

const MeasurementTypeSchema: Schema<IMeasurementType> = new mongoose.Schema({
  name: { type: String, required: true },
  values: [{ type: String, required: true }],
});

export const MeasurementType: Model<IMeasurementType> = mongoose.model("Measurement_type", MeasurementTypeSchema);
