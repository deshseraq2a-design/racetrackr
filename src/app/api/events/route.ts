import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim();
  const country = url.searchParams.get("country");
  const city = url.searchParams.get("city");
  const type = url.searchParams.get("type");
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") || 20)));
  const where = { status: "PUBLISHED" as const, eventDate: { gte: new Date() }, ...(country && { country }), ...(city && { city }), ...(type && { OR: [{ eventType: type }, { distances: { some: { name: type } } }] }), ...(search && { OR: [{ title: { contains: search } }, { city: { contains: search } }, { country: { contains: search } }, { organizerName: { contains: search } }] }) };
  const [data, total] = await Promise.all([db.event.findMany({ where, include: { distances: true }, orderBy: { eventDate: "asc" }, skip: (page - 1) * limit, take: limit }), db.event.count({ where })]);
  return NextResponse.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}
