import mongoose, {Document, Model, Schema} from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  email: string,
  password: string,
  role: number,
  firstName: string,
  lastName: string,
  phone: string,
  birthPlace: string,
  birthDate: Date,
  doctorId: string,
  comparePassword: (receivedPassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  birthPlace: { type: String, required: true },
  birthDate: { type: Date, required: true },
  doctorId: { type: String },
});

UserSchema.pre<IUser>("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, encrypted) => {
    if (error) {
      return next(error);
    }
    console.log(encrypted);
    user.password = encrypted;
    next();
  });
});

UserSchema.methods.comparePassword = function (receivedPassword: string, callback: (error: Error | null, isMatch: boolean) => void): void {
  const user = this;
  bcrypt.compare(receivedPassword, user.password, (error, isMatch) => {
    if (error) {
      callback(error, false);
    }
    callback(null, isMatch);
  });
}

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
