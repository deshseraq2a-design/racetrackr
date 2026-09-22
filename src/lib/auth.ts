import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "raceatlas_admin";
const secret = () => process.env.SESSION_SECRET || "development-only-secret";

export function createSessionToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, expires: Date.now() + 1000 * 60 * 60 * 8 })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function isValidToken(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try { return JSON.parse(Buffer.from(payload, "base64url").toString()).expires > Date.now(); } catch { return false; }
}

export async function isAdmin() { return isValidToken((await cookies()).get(COOKIE_NAME)?.value); }
export { COOKIE_NAME };
