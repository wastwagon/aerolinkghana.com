import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Book Your Transfer",
  description:
    "Reserve your private airport transfer from Kotoka International. Instant fixed fare, vehicle selection, and secure online payment.",
  openGraph: {
    title: "Book Airport Transfer | AeroLink Ghana",
    description:
      "Instant quote and secure online booking for chauffeured transfers across Greater Accra.",
    images: [{ url: IMAGES.hero, width: 1200, height: 630, alt: "Book AeroLink Ghana transfer" }],
  },
});

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservation"
        title="Book your private transfer"
        description="Four simple steps · Instant fixed fare · Pay online, WhatsApp, or cash to chauffeur."
        image={IMAGES.hero}
        imageAlt="Book AeroLink Ghana airport transfer"
        minHeight="min-h-[45vh]"
      />
      <section className="bg-[#fafbfc] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden border border-border bg-white shadow-[0_40px_100px_-40px_rgba(27,54,93,0.2)]">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
