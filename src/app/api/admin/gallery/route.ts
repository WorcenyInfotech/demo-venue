/**
 * GET  /api/admin/gallery — list all images
 * POST /api/admin/gallery — upload new image
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { verifyAdminSession } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const images = await Gallery.find().sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { imageData, title, category, alt } = body;

    if (!imageData || !title || !category) {
      return NextResponse.json(
        { success: false, error: "Image data, title and category are required" },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploaded = await uploadImage(imageData, "greenlandfarm/gallery");

    await connectDB();

    const image = await Gallery.create({
      publicId: uploaded.public_id,
      url: uploaded.secure_url,
      title,
      category,
      alt: alt || title,
    });

    return NextResponse.json(
      { success: true, message: "Image uploaded successfully", data: image },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gallery upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
