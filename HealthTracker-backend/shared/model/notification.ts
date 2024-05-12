import mongoose, {Document, Model, Schema} from "mongoose";
import { User } from "./user";

interface INotification extends Document {
  message: string,
  date: Date,
  user: { type: mongoose.Types.ObjectId }
}

const MeasurementTypeSchema: Schema<INotification> = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Types.ObjectId, ref: User },
});

export const Notification: Model<INotification> = mongoose.model("Notification", MeasurementTypeSchema);
