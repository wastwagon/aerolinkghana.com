import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about AeroLink Ghana airport transfers — booking, pricing, flight delays, payment, and cancellation.",
  openGraph: {
    title: "FAQ | AeroLink Ghana",
    description: "Answers to common questions about chauffeured airport transfers in Accra.",
    images: [{ url: IMAGES.og, width: 1200, height: 630, alt: "AeroLink Ghana FAQ" }],
  },
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions before you fly"
        description="Everything you need to know about reserving a chauffeured transfer with AeroLink Ghana."
        image={IMAGES.hero}
        imageAlt="AeroLink Ghana FAQ"
        minHeight="min-h-[42vh]"
      />
      <FAQSection showHeader={false} />
      <CTABanner />
    </>
  );
}
