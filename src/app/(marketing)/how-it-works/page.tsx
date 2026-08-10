import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "How It Works",
  description:
    "How to book an AeroLink Ghana airport transfer — choose your route, select a vehicle, enter details, and confirm payment.",
  openGraph: {
    title: "How It Works | AeroLink Ghana",
    description: "Four simple steps to your private Kotoka airport transfer.",
    images: [{ url: IMAGES.hero, width: 1200, height: 630, alt: "How AeroLink booking works" }],
  },
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Four steps to your private transfer"
        description="From online reservation to chauffeur dispatch — a seamless booking experience designed for travellers and corporate clients."
        image={IMAGES.hero}
        imageAlt="How AeroLink Ghana booking works"
        minHeight="min-h-[42vh]"
      />
      <ProcessTimeline showHeader={false} />
      <section className="border-t border-border bg-light-blue-bg/30 py-12 text-center">
        <Link
          href="/book"
          className="inline-block bg-navy px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-navy-dark"
        >
          Start your reservation
        </Link>
      </section>
      <CTABanner />
    </>
  );
}
