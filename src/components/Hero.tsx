import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Phone } from "lucide-react";
import { BRAND, HERO_COPY } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Full-bleed hero image */}
      <Image
        src={IMAGES.hero}
        alt="Premium chauffeured airport transfer at Kotoka International Airport"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:justify-center lg:pb-0 lg:pt-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              {HERO_COPY.eyebrow}
            </p>

            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {HERO_COPY.headline}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {HERO_COPY.subheadline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
              >
                {HERO_COPY.cta}
                <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </Link>
              <a
                href={`tel:${BRAND.phone}`}
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                {BRAND.phone}
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-white/15 pt-8 sm:gap-6">
              {[
                { label: "Complimentary Waiting", value: "60", unit: "min" },
                { label: "Concierge Support", value: "24", unit: "/7" },
                { label: "Fare Structure", value: "Fixed", unit: "" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[9px] uppercase tracking-widest text-white/50 sm:text-[10px]">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                    {stat.unit && (
                      <span className="text-sm font-normal text-gold sm:text-base">
                        {stat.unit}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Mobile standards panel */}
            <div className="mt-10 border border-white/15 bg-navy/40 p-6 backdrop-blur-md lg:hidden">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                The AeroLink Standard
              </p>
              <ul className="mt-5 space-y-4">
                {HERO_COPY.standards.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-white/10 pb-4 text-sm leading-snug text-white/90 last:border-0 last:pb-0"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Standards panel — overlaid on hero */}
          <div className="hidden border border-white/15 bg-navy/40 p-8 backdrop-blur-md lg:block lg:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              The AeroLink Standard
            </p>
            <ul className="mt-8 space-y-5">
              {HERO_COPY.standards.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-white/10 pb-5 last:border-0"
                >
                  <span className="font-mono text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-snug text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/book"
              className="mt-10 inline-block w-full border border-gold py-4 text-center text-xs font-semibold uppercase tracking-widest text-gold transition hover:bg-gold hover:text-white"
            >
              Request an Instant Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
