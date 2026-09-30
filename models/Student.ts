import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  uid?: string;
  name: string;
  nameBn?: string;
  email?: string;
  photo?: string;
  photoDriveUrl?: string;
  studentId: string;
  regNo?: string;
  session?: string;
  department?: "AQC" | "FBG" | "FMN" | "FST" | "MFO";
  batch: number;
  semester?: number;
  cgpa?: number;
  gender?: string;
  dob?: string;
  phone?: string;
  altPhone?: string;
  address?: string;
  permanentAddress?: string;
  currentCity?: string;
  currentCountry?: string;
  presentStatus?: string;
  bio?: string;
  achievements?: string[];
  isRegistered?: boolean;
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    uid:              { type: String, unique: true, sparse: true },
    name:             { type: String, required: true },
    nameBn:           String,
    email:            String,
    photo:            String,
    photoDriveUrl:    String,
    studentId:        { type: String, required: true, unique: true },
    regNo:            String,
    session:          String,
    department:       { type: String, enum: ["AQC", "FBG", "FMN", "FST", "MFO"] },
    batch:            { type: Number, required: true },
    semester:         Number,
    cgpa:             Number,
    gender:           String,
    dob:              String,
    phone:            String,
    altPhone:         String,
    address:          String,
    permanentAddress: String,
    currentCity:      String,
    currentCountry:   String,
    presentStatus:    String,
    bio:              String,
    achievements:     [String],
    isRegistered:     { type: Boolean, default: false },
    createdAt:        { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);