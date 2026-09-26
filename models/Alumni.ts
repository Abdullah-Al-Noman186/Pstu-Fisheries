import mongoose, { Schema, Document } from "mongoose";

export interface IAlumni extends Document {
  name: string;
  batch: number;
  department: "AQC" | "FBG" | "FMN" | "FST" | "MFO";
  photo?: string;
  currentPosition?: string;
  organization?: string;
  location?: string;
  email?: string;
  linkedin?: string;
  achievements?: string[];
  testimonial?: string;
  isFeatured?: boolean;
}

const AlumniSchema = new Schema<IAlumni>({
  name:            { type: String, required: true },
  batch:           { type: Number, required: true },
  department:      { type: String, enum: ["AQC","FBG","FMN","FST","MFO"], required: true },
  photo:           String,
  currentPosition: String,
  organization:    String,
  location:        String,
  email:           String,
  linkedin:        String,
  achievements:    [String],
  testimonial:     String,
  isFeatured:      { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Alumni || mongoose.model<IAlumni>("Alumni", AlumniSchema);