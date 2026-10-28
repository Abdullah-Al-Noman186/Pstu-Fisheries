import mongoose, { Schema, Document } from "mongoose";

export interface IProfileReport extends Document {
  reporterUid: string;
  targetUid: string;
  message: string;
  status: "pending" | "reviewed" | "resolved";
  createdAt: Date;
}

const ProfileReportSchema = new Schema<IProfileReport>({
  reporterUid: { type: String, required: true, index: true },
  targetUid: { type: String, required: true, index: true },
  message: { type: String, required: true, trim: true, maxlength: 500 },
  status: { type: String, enum: ["pending", "reviewed", "resolved"], default: "pending", index: true },
}, { timestamps: true });

export default mongoose.models.ProfileReport || mongoose.model<IProfileReport>("ProfileReport", ProfileReportSchema);
