export const BRAND = {
  name: "AeroLink Ghana",
  tagline: "World-Class Airport Transfers",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "0555207204",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "233555207204",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "Burma Camp, Accra, Ghana",
  email: "bookings@aerolinkghana.com",
} as const;

export const AIRPORT_LOCATIONS = [
  "Kotoka International Airport (ACC) — Terminal 1",
  "Kotoka International Airport (ACC) — Terminal 2",
  "Kotoka International Airport (ACC) — Terminal 3",
] as const;

export const POPULAR_DESTINATIONS = [
  "Burma Camp",
  "Airport Residential Area",
  "East Legon",
  "Osu",
  "Cantonments",
  "Labone",
  "Ridge",
  "Dzorwulu",
  "Spintex",
  "Tema",
  "Achimota",
  "Accra Mall",
] as const;

export const DESTINATION_GROUPS = [
  {
    id: "hotels",
    label: "Hotels & Resorts",
    destinations: [
      "Marriott Hotel Accra",
      "Kempinski Hotel Gold Coast City",
      "Labadi Beach Hotel",
      "Mövenpick Ambassador Hotel",
      "Fiesta Royale Hotel",
      "Tang Palace Hotel",
      "Lancaster Accra",
      "Number One Oxford Street Hotel",
    ],
  },
  {
    id: "residences",
    label: "Serviced Residences",
    destinations: [
      "Embassy Gardens",
      "The Lennox",
      "The Signature Apartments",
      "Cantonments City Apartments",
      "Gallery Apartments",
      "Mirage Residence",
      "Pearl in City",
      "The Gallery Luxury Suites",
    ],
  },
  {
    id: "districts",
    label: "Accra Districts",
    destinations: [
      "East Legon",
      "Cantonments",
      "Osu",
      "Labadi",
      "Airport Residential Area",
      "Burma Camp",
      "Spintex",
      "Tema",
    ],
  },
] as const;

export const SERVICE_FEATURES = [
  {
    id: "flight-track",
    title: "Intelligent Flight Monitoring",
    description:
      "Your chauffeur is dispatched against live flight data — not a static schedule. Delays, early arrivals, and gate changes are tracked automatically, so your pickup adapts in real time.",
    accent: "navy",
  },
  {
    id: "grace",
    title: "Sixty Minutes, Complimentary",
    description:
      "Immigration and baggage reclaim take as long as they take. Every airport arrival includes a full hour of complimentary waiting from touchdown — unhurried, unrushed, entirely on us.",
    accent: "gold",
  },
  {
    id: "meet-greet",
    title: "Arrivals Hall Concierge",
    description:
      "Step off the aircraft to find your chauffeur waiting with a personalised name board, ready to assist with luggage and escort you to a pristine, climate-controlled vehicle.",
    accent: "light",
  },
  {
    id: "direct",
    title: "Exclusive Door-to-Door",
    description:
      "Your transfer is yours alone — no shared journeys, no intermediate stops, no deviations. A direct, private route from terminal kerb to your final destination.",
    accent: "navy",
  },
  {
    id: "support",
    title: "Round-the-Clock Concierge",
    description:
      "Our operations team is available twenty-four hours a day, seven days a week. Amendments, special requests, and corporate accounts are handled with the urgency they deserve.",
    accent: "gold",
  },
  {
    id: "pricing",
    title: "Transparent, Fixed Fares",
    description:
      "The price confirmed at booking is the price you pay — inclusive of airport access, fuel, and gratuity. No surge pricing. No hidden supplements. Ever.",
    accent: "light",
  },
] as const;

export const BOOKING_STEPS = [
  {
    step: "01",
    title: "Plan Your Journey",
    description:
      "Enter your pickup and destination points. Our system calculates distance instantly and presents every vehicle class with clear, fixed pricing — no quotation delays.",
  },
  {
    step: "02",
    title: "Choose Your Vehicle",
    description:
      "Select from our executive sedans, premium SUVs, and luxury vans. Compare capacity, luggage allowance, and amenities including Wi-Fi, child seats, and additional legroom.",
  },
  {
    step: "03",
    title: "Confirm & Pay Securely",
    description:
      "Review your itinerary, add any special requirements, and pay securely online — card, mobile money, or bank transfer. Cash and WhatsApp reservations also welcome.",
  },
  {
    step: "04",
    title: "Travel in Distinction",
    description:
      "Your chauffeur monitors your flight, meets you at arrivals, and delivers you door-to-door in an immaculate, air-conditioned vehicle. Effortless from first contact to final destination.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Where exactly will my chauffeur meet me at Kotoka Airport?",
    answer:
      "For Terminal 3 arrivals, your chauffeur will be positioned in the main arrivals hall, holding a personalised name board. Prior to your pickup, we share your driver's photograph, vehicle registration, and direct WhatsApp contact details.",
  },
  {
    question: "What happens if my flight is delayed or arrives early?",
    answer:
      "We monitor every flight in real time. Should your arrival time change, your pickup is adjusted automatically at no additional cost. There is no need to contact us — we are already tracking your journey.",
  },
  {
    question: "How much complimentary waiting time is included?",
    answer:
      "All airport pickups include sixty minutes of complimentary waiting from the moment your flight lands, covering immigration processing, baggage collection, and any unforeseen delays within the terminal.",
  },
  {
    question: "Which vehicles are available in your fleet?",
    answer:
      "Our fleet comprises executive sedans, premium SUVs, and luxury vans — each immaculately maintained, fully air-conditioned, and driven by professionally trained chauffeurs. Child seats and additional luggage capacity are available upon request.",
  },
  {
    question: "May I cancel or amend my reservation?",
    answer:
      "Certainly. Cancellations and amendments are complimentary up to forty-eight hours before your scheduled pickup. Changes within four hours of departure may incur a fee. Our concierge team is available to assist at any time.",
  },
  {
    question: "Will I encounter any hidden charges?",
    answer:
      "None whatsoever. Your quoted fare includes airport access fees, fuel, and driver gratuity. The amount displayed at the point of booking is precisely what you will pay — we guarantee it.",
  },
  {
    question: "Do you serve East Legon, Cantonments, Osu, and surrounding areas?",
    answer:
      "Yes. We provide comprehensive coverage across Greater Accra, including East Legon, Cantonments, Osu, Labadi, Airport Residential, Spintex, Tema, Burma Camp, and all major business and residential districts.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, Mobile Money (MTN, Vodafone, AirtelTigo), and bank transfers online. Cash payment to your chauffeur and WhatsApp reservations are equally welcome.",
  },
] as const;

export const PAYMENT_METHODS = [
  { id: "paystack", label: "Pay Online", sub: "Card · MoMo · Bank" },
  { id: "whatsapp", label: "WhatsApp", sub: "Instant confirmation" },
  { id: "cash", label: "Cash", sub: "Pay your chauffeur" },
] as const;

export const HERO_COPY = {
  eyebrow: "Accra · Kotoka International Airport",
  headline: "The standard in private airport transfers",
  subheadline:
    "From Burma Camp to Kotoka and across Greater Accra — chauffeured journeys with fixed fares, intelligent flight tracking, and secure online payment. Uncompromising service, without compromise on price.",
  cta: "Reserve Your Transfer",
  standards: [
    "Intelligent flight-tracked dispatch",
    "Complimentary terminal meet-and-greet",
    "Visa · Mobile Money · Bank transfer",
    "Corporate accounts and leisure travel",
  ],
} as const;
