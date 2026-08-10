import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CredibilityBadges } from "@/components/CredibilityBadges";
import { footerNav } from "@/lib/navigation";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer id="contact" className="gradient-navy pb-nav text-white lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Ghana&apos;s premier chauffeured airport transfer service. From
              Kotoka International to every corner of Greater Accra — delivered
              with international standards and local excellence.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {BRAND.address}
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-3 transition hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 transition hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Navigation
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/75">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            Licensed · Insured · Registered
          </p>
          <CredibilityBadges variant="dark" compact />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <p className="mt-1 text-[10px] text-white/30">
              Secure online payments processed by{" "}
              <a
                href="https://paystack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 underline-offset-2 hover:text-gold hover:underline"
              >
                Paystack
              </a>
            </p>
          </div>
          <p className="text-xs text-white/40">
            Chauffeured transfers · Kotoka International · Greater Accra
          </p>
        </div>
      </div>
    </footer>
  );
}
