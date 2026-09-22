import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSessionToken, COOKIE_NAME, isAdmin } from "@/lib/auth";

async function login(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    (await cookies()).set(COOKIE_NAME, createSessionToken(email), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
    redirect("/admin");
  }
  redirect("/admin/login?error=invalid");
}

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  return <main className="auth-shell"><div className="auth-card"><p className="section-kicker">Race Atlas / Admin</p><h1>Welcome back.</h1><p>Sign in to manage the global race calendar.</p>{error && <div className="auth-error">Invalid email or password.</div>}<form action={login} className="filter-form"><label>Email<input type="email" name="email" required autoComplete="username" /></label><label>Password<input type="password" name="password" required autoComplete="current-password" /></label><button className="button button--dark" type="submit">Sign in</button></form></div></main>;
}
