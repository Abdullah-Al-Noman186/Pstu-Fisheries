import mongoose, { Schema, Document } from "mongoose";

export interface IResearch extends Document {
  title: string;
  authors: string[];
  department: string;
  journal?: string;
  year: number;
  abstract?: string;
  link?: string;
  type: "journal" | "conference" | "thesis" | "book";
}

const ResearchSchema = new Schema<IResearch>({
  title:      { type: String, required: true },
  authors:    [String],
  department: String,
  journal:    String,
  year:       { type: Number, required: true },
  abstract:   String,
  link:       String,
  type:       { type: String, enum: ["journal","conference","thesis","book"], required: true }
}, { timestamps: true });

export default mongoose.models.Research || mongoose.model<IResearch>("Research", ResearchSchema);