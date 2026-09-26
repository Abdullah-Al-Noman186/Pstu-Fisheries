import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  uid: string;
  name: string;
  email: string;
  photo?: string;
  role: "admin" | "teacher" | "alumni" | "student";
  department?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  uid:        { type: String, required: true, unique: true },
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  photo:      String,
  role:       { type: String, enum: ["admin","teacher","alumni","student"], default: "student" },
  department: String,
  createdAt:  { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);