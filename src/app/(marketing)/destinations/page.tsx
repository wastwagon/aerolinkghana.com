import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { DestinationsExplorer } from "@/components/DestinationsExplorer";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Destinations",
  description:
    "Airport transfers from Kotoka International to hotels, serviced residences, embassies, and districts across Greater Accra.",
  openGraph: {
    title: "Accra Destinations | AeroLink Ghana",
    description:
      "Private transfers to East Legon, Cantonments, Osu, Airport Residential, and leading hotels across Accra.",
    images: [{ url: IMAGES.hero, width: 1200, height: 630, alt: "AeroLink Ghana destinations" }],
  },
});

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Where we take you from Kotoka"
        description="Leading hotels, serviced residences, embassies, and residential districts across Greater Accra."
        image={IMAGES.hero}
        imageAlt="Accra destinations from Kotoka airport"
        minHeight="min-h-[42vh]"
      />
      <DestinationsExplorer showHeader={false} />
      <CTABanner />
    </>
  );
}
