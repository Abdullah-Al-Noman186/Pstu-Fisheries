import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image?: string;
  category: "news" | "notice" | "event" | "achievement";
  department?: string;
  publishedAt: Date;
  isPublished: boolean;
  author: string;
}

const NewsSchema = new Schema<INews>({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  content:     { type: String, required: true },
  excerpt:     { type: String, required: true },
  image:       String,
  category:    { type: String, enum: ["news","notice","event","achievement"], required: true },
  department:  String,
  publishedAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
  author:      { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.News || mongoose.model<INews>("News", NewsSchema);