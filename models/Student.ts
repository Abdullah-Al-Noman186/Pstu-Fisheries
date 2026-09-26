import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  uid: string;
  name: string;
  email: string;
  photo?: string;
  studentId: string;
  department: "AQC" | "FBG" | "FMN" | "FST" | "MFO";
  batch: number;
  semester?: number;
  cgpa?: number;
  phone?: string;
  address?: string;
  bio?: string;
  achievements?: string[];
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  uid:          { type: String, required: true, unique: true },
  name:         { type: String, required: true },
  email:        { type: String, required: true },
  photo:        String,
  studentId:    { type: String, required: true, unique: true },
  department:   { type: String, enum: ["AQC","FBG","FMN","FST","MFO"], required: true },
  batch:        { type: Number, required: true },
  semester:     Number,
  cgpa:         Number,
  phone:        String,
  address:      String,
  bio:          String,
  achievements: [String],
  createdAt:    { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);