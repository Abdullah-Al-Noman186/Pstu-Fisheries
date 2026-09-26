import mongoose, { Schema, Document } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  designation: string;
  department: "AQC" | "FBG" | "FMN" | "FST" | "MFO";
  email: string;
  phone?: string;
  photo?: string;
  bio?: string;
  education: { degree: string; institution: string; year: number }[];
  publications?: number;
  researchAreas?: string[];
  joinYear?: number;
  isHOD?: boolean;
  order?: number;
}

const TeacherSchema = new Schema<ITeacher>({
  name:          { type: String, required: true },
  designation:   { type: String, required: true },
  department:    { type: String, enum: ["AQC","FBG","FMN","FST","MFO"], required: true },
  email:         { type: String, required: true },
  phone:         String,
  photo:         String,
  bio:           String,
  education:     [{ degree: String, institution: String, year: Number }],
  publications:  Number,
  researchAreas: [String],
  joinYear:      Number,
  isHOD:         { type: Boolean, default: false },
  order:         { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema);