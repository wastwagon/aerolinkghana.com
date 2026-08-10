import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, getAdminEmail } from "@/lib/email";
import { BRAND } from "@/lib/constants";
import {
  getClientIp,
  rateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

const enquirySchema = z.object({
  company: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  serviceType: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`corporate:enquiry:${ip}`, 5, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many enquiries. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rl, 5) }
    );
  }

  try {
    const body = await request.json();
    const data = enquirySchema.parse(body);

    const html = `
      <h2>New Corporate Enquiry</h2>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Contact:</strong> ${data.contactName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Service:</strong> ${data.serviceType}</p>
      <p><strong>Requirements:</strong></p>
      <p>${data.message}</p>
    `;

    await sendEmail({
      to: getAdminEmail(),
      subject: `Corporate Enquiry — ${data.company}`,
      html,
    });

    await sendEmail({
      to: data.email,
      subject: `Enquiry Received | ${BRAND.name} Corporate Services`,
      html: `
        <p>Dear ${data.contactName},</p>
        <p>Thank you for your interest in ${BRAND.name} corporate services. Our team will review your requirements and respond within one business hour.</p>
        <p>Kind regards,<br/>The ${BRAND.name} Corporate Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
