import mongoose, {Document, Model, mongo, Schema} from "mongoose";

interface IUser extends Document {
  email: string;
  // password: string,
  role: number;
  firstName: string;
  lastName: string;
  phone: string;
  birthPlace: string;
  // BirthDate: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  birthPlace: { type: String, required: true },
  // BirthDate: { type: Date, required: true },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
