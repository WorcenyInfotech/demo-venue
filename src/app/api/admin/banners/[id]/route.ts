/**
 * PATCH  /api/admin/banners/[id]
 * DELETE /api/admin/banners/[id]
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/models/Banner";
import { verifyAdminSession } from "@/lib/auth";
import { deleteImage } from "@/lib/cloudinary";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    await connectDB();
    const banner = await Banner.findByIdAndUpdate(id, body, { new: true });

    if (!banner) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    console.error("Banner update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const banner = await Banner.findById(id);
    if (!banner) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 });
    }

    await deleteImage(banner.publicId);
    await Banner.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Banner deleted" });
  } catch (error) {
    console.error("Banner delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
