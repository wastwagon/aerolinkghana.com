"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { BRAND } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { formatCurrency } from "@/lib/utils";
import "./brochure.css";

const FLEET = [
  {
    name: "Executive Sedan",
    image: IMAGES.fleet.sedan,
    capacity: "1–3 passengers",
    from: 150,
    description: "Mercedes E-Class or equivalent. The definitive choice for business travellers.",
  },
  {
    name: "Premium SUV",
    image: IMAGES.fleet.suv,
    capacity: "1–5 passengers",
    from: 220,
    description: "Range Rover or Land Cruiser. Generous space and commanding comfort.",
  },
  {
    name: "Luxury Van",
    image: IMAGES.fleet.van,
    capacity: "6–10 passengers",
    from: 350,
    description: "Mercedes Sprinter. The preferred vehicle for delegations and groups.",
  },
];

export default function BrochurePage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") === "true") {
      setTimeout(() => window.print(), 800);
    }
  }, []);

  return (
    <div className="brochure">
      {/* Cover */}
      <section className="brochure-page brochure-cover">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          className="brochure-cover-image"
          priority
        />
        <div className="brochure-cover-overlay" />
        <div className="brochure-cover-content">
          <div className="brochure-logo">
            <Logo variant="light" />
          </div>
          <h1 className="brochure-cover-title">Corporate Capabilities</h1>
          <p className="brochure-cover-subtitle">
            World-class chauffeured airport transfers across Accra
          </p>
          <p className="brochure-cover-meta">{BRAND.address} · {BRAND.phone}</p>
        </div>
      </section>

      {/* About */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">About Us</p>
        <h2 className="brochure-heading">Ghana&apos;s premier airport transfer service</h2>
        <p className="brochure-body">
          AeroLink Ghana delivers chauffeured transportation from Kotoka International Airport
          to destinations across Greater Accra. Founded at Burma Camp, we serve corporate
          accounts, diplomatic missions, luxury hotels, and discerning individual travellers
          with intelligent flight tracking, terminal meet-and-greet, and transparent fixed pricing.
        </p>
        <div className="brochure-stats">
          {[
            { v: "24/7", l: "Concierge" },
            { v: "60 min", l: "Free Waiting" },
            { v: "100%", l: "Fixed Fares" },
            { v: "3", l: "Vehicle Classes" },
          ].map((s) => (
            <div key={s.l} className="brochure-stat">
              <strong>{s.v}</strong>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fleet */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">Our Fleet</p>
        <h2 className="brochure-heading">Three classes of distinction</h2>
        <div className="brochure-fleet">
          {FLEET.map((v) => (
            <div key={v.name} className="brochure-fleet-item">
              <div className="brochure-fleet-image">
                <Image src={v.image} alt={v.name} fill className="object-cover" />
              </div>
              <h3>{v.name}</h3>
              <p className="brochure-fleet-cap">{v.capacity}</p>
              <p className="brochure-body">{v.description}</p>
              <p className="brochure-fleet-price">From {formatCurrency(v.from)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">Corporate Services</p>
        <h2 className="brochure-heading">Tailored for organisations</h2>
        <div className="brochure-services">
          {[
            {
              t: "Corporate Accounts",
              d: "Centralised billing, monthly invoicing, dedicated account manager, and priority dispatch for regular transfer requirements.",
            },
            {
              t: "Hotel Partnerships",
              d: "White-label guest transfers with personalised name boards, hotel billing integration, and twenty-four-hour partner support.",
            },
            {
              t: "Events & Delegations",
              d: "Multi-vehicle coordination for conferences, summits, and diplomatic visits with on-site dispatch supervision.",
            },
          ].map((s) => (
            <div key={s.t} className="brochure-service">
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="brochure-page brochure-contact">
        <p className="brochure-eyebrow">Contact</p>
        <h2 className="brochure-heading">Begin the conversation</h2>
        <div className="brochure-contact-grid">
          <div>
            <strong>Phone</strong>
            <p>{BRAND.phone}</p>
          </div>
          <div>
            <strong>Email</strong>
            <p>{BRAND.email}</p>
          </div>
          <div>
            <strong>WhatsApp</strong>
            <p>+{BRAND.whatsapp}</p>
          </div>
          <div>
            <strong>Address</strong>
            <p>{BRAND.address}</p>
          </div>
        </div>
        <p className="brochure-footer-note">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          Fixed fares · Flight-tracked · Paystack-secured payments.
        </p>
      </section>

      <div className="brochure-print-bar no-print">
        <button type="button" onClick={() => window.print()} className="brochure-print-btn">
          Save as PDF / Print
        </button>
      </div>
    </div>
  );
}
