/**
 * Authentication Utilities
 * JWT-based authentication for admin panel
 */

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_NAME = "glf_admin_token";
const TOKEN_EXPIRY = "7d";

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

// ============================================
// Password Utilities
// ============================================

/**
 * Hash a plain text password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare plain text password with hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============================================
// JWT Utilities
// ============================================

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Sign a JWT token
 */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// ============================================
// Cookie Utilities
// ============================================

/**
 * Get admin token from cookies (server-side)
 */
export async function getAdminToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value || null;
}

/**
 * Verify admin session from cookies
 */
export async function verifyAdminSession(): Promise<JWTPayload | null> {
  const token = await getAdminToken();
  if (!token) return null;
  return verifyToken(token);
}

export { TOKEN_NAME };
