import type { Metadata } from "next";
import { ExperienceSection } from "@/components/ExperienceSection";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "The Experience",
  description:
    "Terminal meet-and-greet at Kotoka International — personalised name board, luggage assistance, and escort to your vehicle.",
  openGraph: {
    title: "Arrivals Concierge | AeroLink Ghana",
    description:
      "Professional meet-and-greet service at Kotoka International Airport arrivals hall.",
    images: [{ url: IMAGES.meetGreet, width: 1200, height: 630, alt: "AeroLink meet and greet" }],
  },
});

export default function ExperiencePage() {
  return (
    <>
      <ExperienceSection />
      <CTABanner />
    </>
  );
}
