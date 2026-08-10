import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Track Booking",
  description:
    "Check your AeroLink Ghana reservation status using your booking reference and email — no account required.",
});

export default function BookingStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
