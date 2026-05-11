/**
 * Database Seed Script
 * Run: npx ts-node src/lib/seed.ts
 * Or via API: POST /api/admin/seed (development only)
 */

import connectDB from "./mongodb";
import Admin from "@/models/Admin";
import { hashPassword } from "./auth";

export async function seedAdmin() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@greenlandfarm.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123456";

  // Check if admin already exists
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("✅ Admin already exists:", email);
    return { success: true, message: "Admin already exists" };
  }

  // Create admin
  const hashedPassword = await hashPassword(password);
  await Admin.create({
    email,
    password: hashedPassword,
    name: "Green Land Farm Admin",
    role: "superadmin",
  });

  console.log("✅ Admin created successfully:", email);
  return { success: true, message: "Admin created successfully" };
}
