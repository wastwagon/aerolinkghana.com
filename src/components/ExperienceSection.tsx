import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

export function ExperienceSection() {
  return (
    <section id="experience" className="overflow-hidden bg-navy">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-[400px] lg:min-h-[600px]">
          <Image
            src={IMAGES.meetGreet}
            alt="Professional chauffeur meet-and-greet service at airport arrivals"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-navy/20 lg:bg-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Arrivals Concierge
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Met at the terminal.
            <br />
            Escorted in comfort.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75">
            The moment you clear customs, your AeroLink chauffeur is there — 
            professionally attired, name board in hand, ready to assist with 
            luggage and guide you to your vehicle. No searching. No uncertainty. 
            Just a seamless transition from aircraft to doorstep.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Personalised name board at arrivals",
              "Driver photograph shared before pickup",
              "Full luggage assistance included",
              "Direct escort to your vehicle",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-white/85"
              >
                <span className="h-px w-6 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/book"
            className="mt-10 inline-flex w-fit border border-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-gold transition hover:bg-gold hover:text-white"
          >
            Reserve Your Chauffeur
          </Link>
        </div>
      </div>
    </section>
  );
}
