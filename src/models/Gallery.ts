/**
 * Gallery Image Model
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGallery extends Document {
  publicId: string;
  url: string;
  title: string;
  category: "wedding" | "reception" | "engagement" | "decoration" | "venue";
  alt: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    publicId: {
      type: String,
      required: [true, "Public ID is required"],
      unique: true,
    },
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    category: {
      type: String,
      enum: ["wedding", "reception", "engagement", "decoration", "venue"],
      default: "wedding",
    },
    alt: {
      type: String,
      trim: true,
      default: "Green Land Farm Wedding Venue",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

GallerySchema.index({ category: 1, isActive: 1 });
GallerySchema.index({ order: 1 });

const Gallery: Model<IGallery> =
  mongoose.models.Gallery ||
  mongoose.model<IGallery>("Gallery", GallerySchema);

export default Gallery;
