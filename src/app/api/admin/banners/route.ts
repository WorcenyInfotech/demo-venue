/**
 * GET  /api/admin/banners
 * POST /api/admin/banners
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/models/Banner";
import { verifyAdminSession } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const banners = await Banner.find().sort({ order: 1 }).lean();

    return NextResponse.json({ success: true, data: banners });
  } catch (error) {
    console.error("Banners fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch banners" },
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
    const { imageData, title, subtitle, ctaText, ctaLink } = body;

    if (!imageData || !title) {
      return NextResponse.json(
        { success: false, error: "Image and title are required" },
        { status: 400 }
      );
    }

    const uploaded = await uploadImage(imageData, "greenlandfarm/banners");

    await connectDB();

    const banner = await Banner.create({
      title,
      subtitle: subtitle || "",
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      ctaText,
      ctaLink,
    });

    return NextResponse.json(
      { success: true, message: "Banner created", data: banner },
      { status: 201 }
    );
  } catch (error) {
    console.error("Banner create error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
