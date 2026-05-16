/**
 * Inquiry Model
 * Stores all wedding inquiry submissions
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  mobile: string;
  email: string;
  name: string;
  eventType: string;
  guestCount: string;
  functionDate: Date;
  message: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
    },
    guestCount: {
      type: String,
      required: [true, "Guest count is required"],
      trim: true,
    },
    functionDate: {
      type: Date,
      required: [true, "Function date is required"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "cancelled"],
      default: "new",
    },
    ipAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for performance
InquirySchema.index({ createdAt: -1 });
InquirySchema.index({ status: 1 });
InquirySchema.index({ email: 1 });
InquirySchema.index({ mobile: 1 });

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
