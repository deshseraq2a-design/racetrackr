"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { eventInputSchema, makeSlug } from "@/lib/validation";

function parseInput(formData: FormData) {
  return eventInputSchema.parse({
    title: formData.get("title"), shortDescription: formData.get("shortDescription"), description: formData.get("description"),
    eventDate: formData.get("eventDate"), country: formData.get("country"), countryCode: formData.get("countryCode"), city: formData.get("city"), venue: formData.get("venue"),
    organizerName: formData.get("organizerName"), websiteUrl: formData.get("websiteUrl"), registrationUrl: formData.get("registrationUrl"), imageUrl: formData.get("imageUrl"),
    eventType: formData.get("eventType"), registrationStatus: formData.get("registrationStatus"), status: formData.get("status"), featured: formData.get("featured") === "on",
    distances: String(formData.get("distances") || "").split(",").map((item) => { const [name, distance] = item.split(":"); return { name: name.trim(), distance: Number(distance) }; }),
  });
}

export async function createEvent(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const input = parseInput(formData);
  const slug = makeSlug(input.title, input.eventDate);
  await db.event.create({ data: { ...input, slug, distances: { create: input.distances } } });
  revalidatePath("/"); revalidatePath("/events"); redirect("/admin/events");
}

export async function updateEvent(id: string, formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const input = parseInput(formData);
  await db.event.update({ where: { id }, data: { ...input, distances: { deleteMany: {}, create: input.distances } } });
  revalidatePath("/"); revalidatePath("/events"); redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  await db.event.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/"); revalidatePath("/events");
}
