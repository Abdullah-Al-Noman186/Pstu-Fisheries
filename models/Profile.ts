import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  uid: string;
  role: "admin" | "teacher" | "alumni" | "student";
  name: string;
  email: string;
  photo?: string;
  phone?: string;
  address?: string;
  bio?: string;
  department?: string;
  // Teacher fields
  designation?: string;
  publications?: number;
  researchAreas?: string[];
  joinYear?: number;
  education?: { degree: string; institution: string; year: number }[];
  // Student fields
  studentId?: string;
  batch?: number;
  semester?: number;
  cgpa?: number;
  // Alumni fields
  currentPosition?: string;
  organization?: string;
  location?: string;
  linkedin?: string;
  achievements?: string[];
  testimonial?: string;
  studentRecord?: Record<string, unknown>;
}

const ProfileSchema = new Schema<IProfile>({
  uid:           { type: String, required: true, unique: true },
  role:          { type: String, enum: ["admin","teacher","alumni","student"], required: true },
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  photo:         String,
  phone:         String,
  address:       String,
  bio:           String,
  department:    String,
  designation:   String,
  publications:  Number,
  researchAreas: [String],
  joinYear:      Number,
  education:     [{ degree: String, institution: String, year: Number }],
  studentId:     String,
  batch:         Number,
  semester:      Number,
  cgpa:          Number,
  currentPosition: String,
  organization:  String,
  location:      String,
  linkedin:      String,
  achievements:  [String],
  testimonial:   String,
  studentRecord: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
