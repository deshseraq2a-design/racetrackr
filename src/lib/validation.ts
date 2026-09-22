import { z } from "zod";

export const eventInputSchema = z.object({
  title: z.string().trim().min(3).max(160),
  shortDescription: z.string().trim().min(10).max(280),
  description: z.string().trim().min(10),
  eventDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  startTime: z.string().trim().max(20).optional(),
  country: z.string().trim().min(2),
  countryCode: z.string().trim().length(2).toUpperCase(),
  city: z.string().trim().min(2),
  venue: z.string().trim().max(180).optional(),
  organizerName: z.string().trim().min(2),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  registrationUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  eventType: z.string().trim().min(2),
  registrationStatus: z.enum(["OPEN", "COMING_SOON", "SOLD_OUT", "CLOSED"]),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]),
  featured: z.boolean().default(false),
  distances: z.array(z.object({ name: z.string().min(1), distance: z.coerce.number().positive() })).min(1),
});

export type EventInput = z.infer<typeof eventInputSchema>;

export function makeSlug(title: string, date: Date) {
  const suffix = date.getUTCFullYear();
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${suffix}`;
}
