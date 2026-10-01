import mongoose, { Schema, Document } from "mongoose";

export const ARCHIVE_CATEGORIES = [
  "Achievement",
  "Research",
  "Event",
  "Award",
  "Fieldwork",
  "Student Success",
  "Faculty News",
] as const;

export interface IArchive extends Document {
  title: string;
  description: string;
  image: string;
  category: (typeof ARCHIVE_CATEGORIES)[number];
  year?: string;
  location?: string;
  author: { name: string; photo?: string };
  postedBy: string;
  createdAt: Date;
}

const ArchiveSchema = new Schema<IArchive>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    image: { type: String, required: true },
    category: { type: String, enum: [...ARCHIVE_CATEGORIES], required: true },
    year: { type: String, trim: true, maxlength: 4 },
    location: { type: String, trim: true, maxlength: 160 },
    author: {
      name: { type: String, required: true },
      photo: String,
    },
    postedBy: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Archive || mongoose.model<IArchive>("Archive", ArchiveSchema);
