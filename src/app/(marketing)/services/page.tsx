import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FeatureBento } from "@/components/FeatureBento";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Our Services",
  description:
    "Chauffeured airport transfers across Greater Accra with flight tracking, meet-and-greet, fixed fares, and 24/7 concierge support.",
  openGraph: {
    title: "Airport Transfer Services | AeroLink Ghana",
    description:
      "Private Kotoka airport transfers with intelligent flight monitoring, complimentary waiting time, and transparent pricing.",
    images: [{ url: IMAGES.meetGreet, width: 1200, height: 630, alt: "AeroLink Ghana services" }],
  },
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we do for every journey"
        description="From Kotoka International to hotels, residences, and business districts — private transfers delivered with international standards."
        image={IMAGES.meetGreet}
        imageAlt="AeroLink Ghana chauffeured services"
      />
      <FeatureBento showHeader={false} />
      <CTABanner />
    </>
  );
}
