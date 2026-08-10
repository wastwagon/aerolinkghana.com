import { BRAND } from "@/lib/constants";

export const TRUST_STATS = [
  { value: "2,500+", label: "Happy Clients", suffix: "" },
  { value: "8,000+", label: "Journeys Completed", suffix: "" },
  { value: "99.5%", label: "On-Time Pickups", suffix: "" },
  { value: "4.9", label: "Average Rating", suffix: "★" },
] as const;

export const GOOGLE_REVIEWS = {
  rating: 4.9,
  totalReviews: 127,
  reviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ??
    "https://www.google.com/maps/search/?api=1&query=AeroLink+Ghana+Burma+Camp+Accra",
} as const;

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah Mitchell",
    initials: "SM",
    location: "United Kingdom",
    rating: 5,
    date: "2 weeks ago",
    quote:
      "Excellent service. My flight was delayed and they tracked it automatically — the driver was still waiting when I cleared customs. Professional, clean vehicle, and a fixed price with no surprises.",
  },
  {
    id: "2",
    name: "Kwame Asante",
    initials: "KA",
    location: "Accra, Ghana",
    rating: 5,
    date: "1 month ago",
    quote:
      "I use AeroLink for all my airport runs. Booking online takes two minutes, online payment is seamless, and the chauffeurs are always punctual and well presented. Highly recommended for business travel.",
  },
  {
    id: "3",
    name: "Emily Chen",
    initials: "EC",
    location: "Singapore",
    rating: 5,
    date: "3 weeks ago",
    quote:
      "First time in Accra and I was nervous about finding transport. The meet-and-greet at Terminal 3 was flawless — name board, luggage help, and a smooth ride to East Legon. Will book again without hesitation.",
  },
  {
    id: "4",
    name: "James Ofori",
    initials: "JO",
    location: "Corporate Client",
    rating: 5,
    date: "1 month ago",
    quote:
      "Our company switched to AeroLink for visiting executives. Consolidated billing, priority dispatch, and consistently professional service. Exactly what we needed for corporate airport transfers.",
  },
] as const;

export const CREDENTIALS = [
  {
    id: "licensed",
    title: "Licensed Chauffeurs",
    description: "Vetted, professionally trained drivers with full licensing",
  },
  {
    id: "insured",
    title: "Insured Fleet",
    description: "Comprehensive commercial passenger insurance on every vehicle",
  },
  {
    id: "registered",
    title: "Registered Operator",
    description: `Legally registered transport operator · ${BRAND.address}`,
  },
  {
    id: "secure-pay",
    title: "Secure Payments",
    description: "PCI-compliant checkout — card, mobile money, and bank transfer",
  },
  {
    id: "support",
    title: "24/7 Operations",
    description: "Round-the-clock concierge desk via phone and WhatsApp",
  },
  {
    id: "fixed-fare",
    title: "Fixed Fare Guarantee",
    description: "The price at booking is the price you pay — no hidden fees",
  },
] as const;
