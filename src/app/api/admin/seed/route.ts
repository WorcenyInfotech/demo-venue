/**
 * POST /api/admin/seed
 * Create initial admin user — development only
 */

import { NextResponse } from "next/server";
import { seedAdmin } from "@/lib/seed";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, error: "Seed not available in production" },
      { status: 403 }
    );
  }

  try {
    const result = await seedAdmin();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: "Seed failed" },
      { status: 500 }
    );
  }
}
