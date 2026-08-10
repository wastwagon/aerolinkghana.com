import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getBrandConfig } from "@/lib/brand";
import { createMetadata } from "@/lib/metadata";
import { buildWhatsAppUrl } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandConfig();
  return createMetadata({
    title: "Contact",
    description: `Contact ${brand.name} for airport transfer bookings, corporate accounts, and concierge support.`,
    openGraph: {
      title: `Contact Us | ${brand.name}`,
      description: `Call ${brand.phone} or WhatsApp our team for chauffeured transfers across Accra.`,
      images: [{ url: IMAGES.og, width: 1200, height: 630, alt: `Contact ${brand.name}` }],
    },
  });
}

export default async function ContactPage() {
  const brand = await getBrandConfig();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with our concierge team"
        description="Available twenty-four hours a day for bookings, amendments, and corporate enquiries."
        image={IMAGES.meetGreet}
        imageAlt={`Contact ${brand.name}`}
        minHeight="min-h-[42vh]"
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Get in touch
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-navy">
              We&apos;re here around the clock
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Whether you need an immediate airport pickup, a corporate account,
              or help tracking an existing reservation — our operations team
              responds with urgency and care.
            </p>

            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Headquarters
                  </p>
                  <p className="mt-1 font-medium text-navy">{brand.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Phone
                  </p>
                  <a
                    href={`tel:${brand.phone}`}
                    className="mt-1 block font-medium text-navy hover:text-gold"
                  >
                    {brand.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-1 block font-medium text-navy hover:text-gold"
                  >
                    {brand.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    WhatsApp
                  </p>
                  <a
                    href={buildWhatsAppUrl(
                      "Hi AeroLink Ghana, I'd like to get in touch.",
                      brand.whatsapp
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-medium text-navy hover:text-gold"
                  >
                    Chat with concierge
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="border border-border bg-light-blue-bg/40 p-8 sm:p-10">
            <h3 className="font-display text-xl font-bold text-navy">
              Ready to travel?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The fastest way to secure your transfer is through our online
              booking page — instant quote, vehicle selection, and secure
              online payment.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-gold px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
              >
                Book a transfer
              </Link>
              <WhatsAppButton label="Message on WhatsApp" />
              <Link
                href="/booking/status"
                className="text-center text-sm font-semibold text-navy underline underline-offset-4"
              >
                Track an existing booking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
