/**
 * GET /api/admin/stats
 * Dashboard analytics
 */

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import Gallery from "@/models/Gallery";
import Testimonial from "@/models/Testimonial";
import { verifyAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [
      totalInquiries,
      newInquiries,
      contactedInquiries,
      confirmedInquiries,
      totalGalleryImages,
      totalTestimonials,
      recentInquiries,
      monthlyData,
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: "new" }),
      Inquiry.countDocuments({ status: "contacted" }),
      Inquiry.countDocuments({ status: "confirmed" }),
      Gallery.countDocuments({ isActive: true }),
      Testimonial.countDocuments({ isActive: true }),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      // Last 6 months inquiry counts
      Inquiry.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalInquiries,
        newInquiries,
        contactedInquiries,
        confirmedInquiries,
        totalGalleryImages,
        totalTestimonials,
        recentInquiries,
        monthlyData,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
