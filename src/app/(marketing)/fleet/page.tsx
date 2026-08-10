import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FleetShowcase } from "@/components/FleetShowcase";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Our Fleet",
  description:
    "Executive sedans, premium SUVs, and luxury vans for airport transfers across Accra. Professionally maintained and chauffeur-driven.",
  openGraph: {
    title: "Executive Fleet | AeroLink Ghana",
    description:
      "Choose from executive sedans, premium SUVs, and luxury vans for your Kotoka airport transfer.",
    images: [{ url: IMAGES.fleet.suv, width: 1200, height: 630, alt: "AeroLink Ghana fleet" }],
  },
});

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet"
        title="Select your class of travel"
        description="Immaculately maintained executive vehicles, each accompanied by a professionally trained chauffeur."
        image={IMAGES.fleet.suv}
        imageAlt="AeroLink Ghana premium fleet"
      />
      <FleetShowcase showHeader={false} />
      <section className="border-t border-border bg-white py-12 text-center">
        <Link
          href="/book"
          className="inline-block bg-gold px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
        >
          Book with this fleet
        </Link>
      </section>
      <CTABanner />
    </>
  );
}
