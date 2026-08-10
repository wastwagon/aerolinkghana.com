import { getBlogImageMeta } from "@/lib/blog-images";
import { prisma } from "@/lib/prisma";

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  contentHtml?: string | null;
}

function withImages<T extends Omit<BlogPost, "image" | "imageAlt">>(
  posts: T[]
): BlogPost[] {
  return posts.map((post) => {
    const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
    return { ...post, image, imageAlt };
  });
}

export const RAW_BLOG_POSTS = [
  {
    slug: "kotoka-airport-to-hotel-accra",
    title: "How to Get from Kotoka Airport to Your Hotel in Accra",
    excerpt:
      "Everything first-time visitors need to know about airport transfers, taxis, ride-hailing, and chauffeur services from Kotoka International Airport.",
    category: "Airport Transfers",
    publishedAt: "2026-06-22",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Arriving at Kotoka International Airport (ACC) for the first time can feel overwhelming. Between customs, baggage reclaim, and the crowd at the arrivals exit, the last thing you want is uncertainty about how you'll reach your hotel.",
          "The good news: with a little planning before you land, your transfer can be the smoothest part of your entire journey.",
        ],
      },
      {
        heading: "Your options from Kotoka Airport",
        bullets: [
          "Official airport taxis — available at the rank, but fares are often negotiated on the spot and quality varies",
          "Ride-hailing apps — convenient in central Accra, but surge pricing and airport pickup coordination can be inconsistent after long flights",
          "Hotel shuttle — only if your property offers one, often at fixed times",
          "Pre-booked private transfer — fixed price, flight tracking, meet-and-greet in arrivals, and direct door-to-door service",
        ],
      },
      {
        heading: "Why pre-booking is the safest choice",
        paragraphs: [
          "For business travellers, families, and first-time visitors, a pre-booked chauffeured transfer removes every variable. Your driver monitors your flight in real time, waits in the arrivals hall with a personalised name board, assists with luggage, and drives you directly to your hotel — Accra Marriott, Kempinski, Labadi Beach Hotel, or any address across Greater Accra.",
          "With AeroLink Ghana, the fare is calculated and confirmed before you fly. Pay securely online via Paystack, or confirm via WhatsApp. No negotiating after a fourteen-hour flight.",
        ],
      },
      {
        heading: "Popular routes and what to expect",
        bullets: [
          "Kotoka → Airport Residential / East Legon: 20–35 minutes depending on traffic",
          "Kotoka → Osu / Labone / Cantonments: 25–40 minutes",
          "Kotoka → Tema: 45–70 minutes",
          "All AeroLink pickups include 60 minutes complimentary waiting from touchdown",
        ],
      },
      {
        heading: "Book before you board",
        paragraphs: [
          "Reserve your transfer at aerolinkghana.com/book before departure. Enter your flight number, destination, and vehicle preference — your quote is instant and guaranteed.",
        ],
      },
    ],
  },
  {
    slug: "first-timers-guide-accra-airport",
    title: "The First-Timer's Guide to Accra Airport Transfers",
    excerpt:
      "Your cheat sheet to touchdown smoothly in Accra — flight tracking, terminal tips, and how to reach your destination stress-free.",
    category: "Travel Tips",
    publishedAt: "2026-06-17",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Kotoka International Airport is Ghana's main gateway, located in the Airport City area roughly 10 kilometres from central Accra. Most international flights arrive at Terminal 3 — a modern facility with clear signage, but one that still rewards travellers who plan ahead.",
        ],
      },
      {
        heading: "Step 1: Before you fly",
        bullets: [
          "Book your airport transfer in advance — do not leave it to chance at arrivals",
          "Share your flight number so your chauffeur can track delays automatically",
          "Save your driver's WhatsApp contact from your confirmation email",
          "Confirm your hotel or residence address including any gate or building details",
        ],
      },
      {
        heading: "Step 2: Clearing the airport",
        paragraphs: [
          "After landing, proceed through immigration and collect your baggage. For Terminal 3 arrivals, exit into the main hall — your chauffeur will be waiting with a name board. If you cannot spot them immediately, check your confirmation for the direct contact number.",
          "Avoid unofficial agents offering transport inside the terminal. Your pre-booked driver is the safest option.",
        ],
      },
      {
        heading: "Step 3: The journey into Accra",
        paragraphs: [
          "Accra traffic varies significantly by time of day. Morning and evening peaks can add twenty to thirty minutes to your journey. A professional chauffeur knows alternative routes through East Legon, Spintex, and the motorway — another reason to book with an experienced operator rather than navigating alone.",
        ],
      },
      {
        heading: "What if my flight is delayed?",
        paragraphs: [
          "If you booked with AeroLink Ghana, we monitor your flight automatically. Your pickup time adjusts to your actual arrival — no need to call unless your plans change entirely. Sixty minutes of complimentary waiting is included from touchdown.",
        ],
      },
    ],
  },
  {
    slug: "kotoka-airport-to-east-legon",
    title: "Kotoka Airport to East Legon: Routes, Times & Tips",
    excerpt:
      "A practical guide to private transfers from Kotoka International to East Legon, Airport Residential, and Trasacco Valley.",
    category: "Destination Guides",
    publishedAt: "2026-07-08",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "East Legon is one of Accra's most popular residential and business districts for expatriates, diplomats, and returning Ghanaians. From embassies and serviced apartments to restaurants and corporate offices, it is among the most frequent destinations from Kotoka International Airport.",
        ],
      },
      {
        heading: "Transfer time and distance",
        paragraphs: [
          "The drive from Kotoka to East Legon typically takes 20 to 35 minutes in light traffic, and up to 50 minutes during peak hours. The route usually follows the airport motorway before branching toward Legon, Trasacco, or American House depending on your exact address.",
        ],
      },
      {
        heading: "Popular East Legon destinations we serve",
        bullets: [
          "Embassy Gardens & The Signature Apartments",
          "Trasacco Valley & Villagio",
          "American House & A&C Mall area",
          "East Legon residential estates",
          "Nearby: Airport Residential Area, Cantonments, Dzorwulu",
        ],
      },
      {
        heading: "Choosing the right vehicle",
        bullets: [
          "Executive Sedan — ideal for 1–3 passengers with standard luggage",
          "Premium SUV — extra space for families or multiple bags",
          "Luxury Van — groups of 6–10 with delegation luggage",
        ],
      },
      {
        heading: "Fixed pricing vs negotiating at the airport",
        paragraphs: [
          "Fares to East Legon vary by vehicle class but should be agreed before you travel. AeroLink provides instant online quotes — select East Legon as your destination on our booking page and see your fixed fare in seconds.",
        ],
      },
    ],
  },
  {
    slug: "kotoka-to-cantonments-osu-labone",
    title: "Kotoka Airport to Cantonments, Osu & Labone: Transfer Guide",
    excerpt:
      "Private transfer times, routes, and tips from Kotoka International to Cantonments, Osu, Labone, and Ridge — Accra's premier hotel districts.",
    category: "Destination Guides",
    publishedAt: "2026-07-15",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Cantonments, Osu, and Labone form the heart of diplomatic and luxury hospitality in Accra. Whether you are staying at a boutique guesthouse on Oxford Street or a serviced apartment near the embassies, a pre-booked private transfer is the most reliable way to arrive from Kotoka International Airport.",
        ],
      },
      {
        heading: "Typical journey times from Kotoka",
        bullets: [
          "Kotoka → Cantonments: 25–40 minutes",
          "Kotoka → Osu / Oxford Street: 30–45 minutes",
          "Kotoka → Labone: 30–45 minutes",
          "Kotoka → Ridge: 20–35 minutes",
          "Peak-hour traffic on the 37-Accra route can add 15–20 minutes",
        ],
      },
      {
        heading: "Hotels and addresses we serve daily",
        bullets: [
          "Kempinski Hotel Gold Coast City",
          "Number One Oxford Street Hotel & Suites",
          "La Villa Boutique Hotel",
          "Embassy and diplomatic residences in Cantonments",
          "Labone, Ring Road Central, and Dzorwulu extensions",
        ],
      },
      {
        heading: "Why book ahead for these districts",
        paragraphs: [
          "Osu and Cantonments are among the busiest areas in Accra after dark. A pre-booked chauffeur meets you inside the terminal, assists with luggage, and navigates directly to your address — no haggling, no wrong turns, and a fare confirmed before you land.",
        ],
      },
    ],
  },
  {
    slug: "airport-taxi-vs-private-transfer-accra",
    title: "Airport Taxi vs Private Transfer in Accra: Which Is Better?",
    excerpt:
      "Compare official airport taxis, ride-hailing apps, and pre-booked chauffeur services from Kotoka International — cost, safety, and convenience.",
    category: "Airport Transfers",
    publishedAt: "2026-07-20",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Every traveller landing at Kotoka faces the same decision: grab a taxi at the rank, order a ride-hailing app, or walk to a pre-booked chauffeur waiting in arrivals. Each option has trade-offs — and for many visitors, the wrong choice turns a smooth arrival into an stressful one.",
        ],
      },
      {
        heading: "Official airport taxis",
        bullets: [
          "Available at the terminal rank after customs",
          "Fares often negotiated on the spot — inconsistent pricing",
          "Vehicle condition and driver standards vary",
          "No flight tracking if your arrival is delayed",
          "Limited luggage capacity for groups",
        ],
      },
      {
        heading: "Ride-hailing apps",
        bullets: [
          "Convenient in central Accra during daytime",
          "Surge pricing possible at peak hours and late night",
          "Airport pickup coordination can be confusing after long flights",
          "Driver may not meet you inside the arrivals hall",
        ],
      },
      {
        heading: "Pre-booked private transfer",
        bullets: [
          "Fixed fare confirmed before you fly",
          "Flight monitoring and automatic schedule adjustment",
          "Meet-and-greet in arrivals with name board",
          "Professional chauffeur and insured vehicle class of your choice",
          "Direct door-to-door — no intermediate stops",
        ],
      },
      {
        heading: "Our recommendation",
        paragraphs: [
          "For first-time visitors, families, and business travellers, a pre-booked private transfer offers the best combination of safety, predictability, and comfort. Book online with AeroLink Ghana for an instant quote and Paystack-secure payment.",
        ],
      },
    ],
  },
  {
    slug: "kotoka-terminal-3-meet-and-greet",
    title: "Kotoka Terminal 3 Meet-and-Greet: What to Expect",
    excerpt:
      "A step-by-step guide to arrivals at Terminal 3, Kotoka International — where to find your chauffeur and how meet-and-greet service works.",
    category: "Travel Tips",
    publishedAt: "2026-07-25",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Terminal 3 at Kotoka International Airport (ACC) handles most international arrivals to Ghana. If you have booked a private transfer with meet-and-greet, here is exactly what happens from the moment you land.",
        ],
      },
      {
        heading: "Step-by-step arrivals process",
        bullets: [
          "Disembark and follow signs to immigration",
          "Complete immigration and collect baggage",
          "Exit through customs into the main arrivals hall",
          "Your chauffeur waits with a personalised name board",
          "Driver assists with luggage and escorts you to the vehicle",
        ],
      },
      {
        heading: "Before you travel",
        bullets: [
          "Share your flight number when booking — we track delays automatically",
          "Save your chauffeur's WhatsApp number from your confirmation email",
          "Confirm your full destination address including building or gate details",
          "Sixty minutes complimentary waiting is included from touchdown",
        ],
      },
      {
        heading: "Cannot find your driver?",
        paragraphs: [
          "Check your booking confirmation for the direct contact number. WhatsApp is the fastest way to reach our operations team. We also share your driver's photograph before pickup so you know exactly who to look for.",
        ],
      },
    ],
  },
  {
    slug: "kotoka-airport-to-tema",
    title: "Kotoka Airport to Tema: Transfer Times & Booking Guide",
    excerpt:
      "How long does it take to get from Kotoka International to Tema? Routes, pricing factors, and tips for port city transfers.",
    category: "Destination Guides",
    publishedAt: "2026-08-01",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Tema — Ghana's principal port city — is a frequent destination for shipping professionals, industrial visitors, and residents commuting between the harbour area and Kotoka International Airport. The journey is longer than central Accra routes and benefits from advance planning.",
        ],
      },
      {
        heading: "Distance and duration",
        bullets: [
          "Distance: approximately 35–40 km depending on your Tema address",
          "Light traffic: 45–60 minutes",
          "Peak hours: 75–90 minutes",
          "Early morning and late evening often fastest",
        ],
      },
      {
        heading: "Who books Tema transfers?",
        bullets: [
          "Shipping and logistics professionals",
          "Port and free-zone business visitors",
          "Residents of Tema Community and surrounding areas",
          "Connections to Spintex Road and Tema Motorway industrial zones",
        ],
      },
      {
        heading: "Book with a fixed fare",
        paragraphs: [
          "Longer routes make fixed pricing especially important — you do not want to negotiate after a long flight. Enter Tema as your destination on our booking page for an instant guaranteed quote.",
        ],
      },
    ],
  },
  {
    slug: "corporate-airport-transfer-accra",
    title: "Corporate Airport Transfer Services in Accra",
    excerpt:
      "Dedicated chauffeured airport transfers for businesses, diplomatic missions, and visiting executives — account management, invoicing, and priority dispatch.",
    category: "Corporate",
    publishedAt: "2026-08-05",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Corporate travel demands reliability that consumer ride-hailing cannot guarantee. When a board member lands at Kotoka at midnight or a delegation of twelve arrives on the same flight, you need a transport partner with account management, consolidated billing, and priority dispatch.",
        ],
      },
      {
        heading: "Corporate account benefits",
        bullets: [
          "Dedicated account manager and priority booking line",
          "Monthly consolidated invoicing",
          "Custom reporting for finance and travel teams",
          "Co-branded guest confirmation emails for hotel partners",
          "Multi-vehicle coordination for delegations and events",
        ],
      },
      {
        heading: "Industries we serve",
        bullets: [
          "Multinational corporations and regional headquarters",
          "Diplomatic missions and international organisations",
          "Luxury hotels and serviced residences",
          "Event planners and conference organisers",
          "NGOs and development agencies",
        ],
      },
      {
        heading: "Open a corporate account",
        paragraphs: [
          "Contact our corporate team via the enquiry form at aerolinkghana.com/corporate. We respond within one business hour with a tailored proposal.",
        ],
      },
    ],
  },
  {
    slug: "accra-airport-transfer-prices-2026",
    title: "Accra Airport Transfer Prices in 2026: What to Expect",
    excerpt:
      "Transparent guide to Kotoka airport transfer pricing in Ghana — what affects your fare and how fixed pricing protects you from surge charges.",
    category: "Airport Transfers",
    publishedAt: "2026-08-08",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Airport transfer pricing in Accra varies widely depending on vehicle class, destination, time of day, and whether you book in advance. Understanding how fares are structured helps you avoid overpaying — and choose the service level that matches your journey.",
        ],
      },
      {
        heading: "What affects your transfer price",
        bullets: [
          "Distance from Kotoka to your destination",
          "Vehicle class — executive sedan, premium SUV, or luxury van",
          "Number of passengers and luggage pieces",
          "Pickup type — airport arrival vs city-to-airport drop-off",
          "Additional stops or special requests",
        ],
      },
      {
        heading: "AeroLink fixed fare model",
        bullets: [
          "Instant online quote at aerolinkghana.com/book",
          "Price includes airport access, fuel, and gratuity",
          "No surge pricing at peak hours or during rain",
          "Same fare whether you pay via Paystack, WhatsApp, or cash",
          "Free cancellation up to 48 hours before pickup",
        ],
      },
      {
        heading: "Typical starting fares (2026)",
        bullets: [
          "Executive Sedan — central Accra districts from GHS 150",
          "Premium SUV — from GHS 220",
          "Luxury Van — groups from GHS 350",
          "Exact fare calculated instantly based on your route",
        ],
      },
      {
        heading: "Get your exact price now",
        paragraphs: [
          "Enter your pickup and destination on our booking page — your fixed fare appears in seconds. No account required.",
        ],
      },
    ],
  },
  {
    slug: "kotoka-airport-hotel-transfers-marriott-kempinski",
    title: "Kotoka Airport to Marriott & Kempinski: Hotel Transfer Guide",
    excerpt:
      "Direct private transfers from Kotoka International to Accra Marriott, Kempinski Gold Coast City, Labadi Beach Hotel, and leading Airport City properties.",
    category: "Destination Guides",
    publishedAt: "2026-08-09",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Accra's leading international hotels cluster around Airport City, Ridge, and the Labadi coastline. If you are staying at the Marriott, Kempinski, or Labadi Beach Hotel, a pre-arranged chauffeur transfer is the standard choice for business and leisure travellers alike.",
        ],
      },
      {
        heading: "Transfer times to major hotels",
        bullets: [
          "Kotoka → Accra Marriott Hotel: 10–20 minutes (Airport City)",
          "Kotoka → Kempinski Gold Coast City: 15–25 minutes",
          "Kotoka → Labadi Beach Hotel: 20–35 minutes",
          "Kotoka → Mövenpick Ambassador: 15–25 minutes",
          "Kotoka → Fiesta Royale / Tang Palace: 20–30 minutes",
        ],
      },
      {
        heading: "Hotel concierge coordination",
        paragraphs: [
          "Share your hotel confirmation with us when booking. We can coordinate with concierge teams for seamless guest arrivals and, for corporate partners, provide co-branded confirmation details.",
        ],
      },
      {
        heading: "Book your hotel transfer",
        paragraphs: [
          "Select your hotel as the destination on our booking form or type the full address. Your chauffeur will deliver you directly to the hotel entrance — no parking hassles, no additional terminal waiting.",
        ],
      },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = withImages(RAW_BLOG_POSTS);

type BlogPostRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: Date;
  readTime: string;
  imageUrl: string | null;
  imageAlt: string | null;
  sections: unknown;
  contentHtml: string | null;
};

function mapDbPost(row: BlogPostRow): BlogPost {
  const fallback = getBlogImageMeta(row.slug, row.title);
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
    readTime: row.readTime,
    image: row.imageUrl ?? fallback.image,
    imageAlt: row.imageAlt ?? fallback.imageAlt,
    sections: (row.sections as BlogSection[]) ?? [],
    contentHtml: row.contentHtml,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length === 0) return BLOG_POSTS;
    return rows.map(mapDbPost);
  } catch {
    return BLOG_POSTS;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const row = await prisma.blogPost.findFirst({
      where: { slug, isPublished: true },
    });
    if (row) return mapDbPost(row);
  } catch {
    // fall through to static
  }
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, limit);

  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    })
    .slice(0, limit);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    if (rows.length === 0) return BLOG_POSTS.map((p) => p.slug);
    return rows.map((r) => r.slug);
  } catch {
    return BLOG_POSTS.map((p) => p.slug);
  }
}

/** @deprecated Use getBlogPost async */
export function getBlogPostSync(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
