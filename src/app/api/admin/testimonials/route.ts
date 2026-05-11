/**
 * GET  /api/admin/testimonials
 * POST /api/admin/testimonials
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { verifyAdminSession } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Testimonials fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
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
    const parsed = testimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();
    const testimonial = await Testimonial.create(parsed.data);

    return NextResponse.json(
      { success: true, message: "Testimonial created", data: testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Testimonial create error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
