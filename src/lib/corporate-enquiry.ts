import { z } from "zod";

export const CORPORATE_SERVICE_TYPES = [
  "corporate",
  "hotel",
  "events",
  "other",
] as const;

export const CORPORATE_HONEYPOT_FIELD = "_hp";

export const corporateEnquirySchema = z.object({
  company: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  serviceType: z.enum(CORPORATE_SERVICE_TYPES),
  message: z.string().min(10),
});

export const corporateEnquiryUpdateSchema = z
  .object({
    status: z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED", "SPAM"]).optional(),
    adminNotes: z.string().optional().nullable(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const SERVICE_TYPE_LABELS: Record<string, string> = {
  corporate: "Corporate Account",
  hotel: "Hotel Partnership",
  events: "Events & Delegations",
  other: "Other",
};

export function serviceTypeLabel(value: string) {
  return SERVICE_TYPE_LABELS[value] ?? value;
}

export function generateCorporateReference() {
  const prefix = "CORP";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
