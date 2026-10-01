import mongoose, { Schema, Document } from "mongoose";

export interface IAlumni extends Document {
  uid?: string;
  name: string;
  nameBn?: string;
  batch: number;
  session?: string;
  department?: "AQC" | "FBG" | "FMN" | "FST" | "MFO";
  photo?: string;
  photoDriveUrl?: string;
  degree?: string;
  currentPosition?: string;
  organization?: string;
  location?: string;
  email?: string;
  linkedin?: string;
  achievements?: string[];
  testimonial?: string;
  bio?: string;
  isFeatured?: boolean;
  studentId?: string;
  regNo?: string;
  gender?: string;
  phone?: string;
  contact?: string;
  altPhone?: string;
  dob?: string;
  permanentAddress?: string;
  currentCity?: string;
  currentCountry?: string;
  presentStatus?: string;
  isRegistered?: boolean;
}

const AlumniSchema = new Schema<IAlumni>(
  {
    uid:              { type: String, unique: true, sparse: true },
    name:             { type: String, required: true },
    nameBn:           String,
    batch:            { type: Number, required: true },
    session:          String,
    department:       { type: String, enum: ["AQC", "FBG", "FMN", "FST", "MFO"] },
    photo:            String,
    photoDriveUrl:    String,
    degree:           String,
    currentPosition:  String,
    organization:     String,
    location:         String,
    email:            String,
    linkedin:         String,
    achievements:     [String],
    testimonial:      String,
    bio:              String,
    isFeatured:       { type: Boolean, default: false },
    studentId:        { type: String, index: true },
    regNo:            String,
    gender:           String,
    phone:            String,
    contact:          String,
    altPhone:         String,
    dob:              String,
    permanentAddress: String,
    currentCity:      String,
    currentCountry:   String,
    presentStatus:    String,
    isRegistered:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Alumni || mongoose.model<IAlumni>("Alumni", AlumniSchema);
