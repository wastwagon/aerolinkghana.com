export interface PricingInput {
  vehicleBasePrice: number;
  vehiclePricePerKm: number;
  pickupLocation: string;
  dropoffLocation: string;
  passengerCount: number;
  type: "PICKUP" | "DROPOFF";
}

export interface PricingResult {
  quotedPrice: number;
  distanceKm: number;
  breakdown: {
    baseFare: number;
    distanceCharge: number;
    passengerSurcharge: number;
    airportFee: number;
  };
}

const AIRPORT_KEYWORDS = ["airport", "kotoka", "acc"];
const BASE_DISTANCE_KM = 15;

function estimateDistanceKm(pickup: string, dropoff: string): number {
  const pickupLower = pickup.toLowerCase();
  const dropoffLower = dropoff.toLowerCase();

  const involvesAirport =
    AIRPORT_KEYWORDS.some((k) => pickupLower.includes(k)) ||
    AIRPORT_KEYWORDS.some((k) => dropoffLower.includes(k));

  if (!involvesAirport) {
    return BASE_DISTANCE_KM;
  }

  const destinations: Record<string, number> = {
    "burma camp": 8,
    "airport residential": 5,
    "east legon": 12,
    osu: 14,
    cantonments: 10,
    labone: 11,
    "accra mall": 13,
    tema: 35,
    spintex: 18,
    achimota: 16,
  };

  const nonAirport = [pickupLower, dropoffLower].find(
    (loc) => !AIRPORT_KEYWORDS.some((k) => loc.includes(k))
  );

  if (nonAirport) {
    for (const [area, km] of Object.entries(destinations)) {
      if (nonAirport.includes(area)) return km;
    }
  }

  return BASE_DISTANCE_KM;
}

export function calculatePrice(input: PricingInput): PricingResult {
  const distanceKm = estimateDistanceKm(
    input.pickupLocation,
    input.dropoffLocation
  );

  const baseFare = input.vehicleBasePrice;
  const distanceCharge = distanceKm * input.vehiclePricePerKm;
  const passengerSurcharge =
    input.passengerCount > 4 ? (input.passengerCount - 4) * 25 : 0;
  const airportFee = 30;

  const quotedPrice =
    baseFare + distanceCharge + passengerSurcharge + airportFee;

  return {
    quotedPrice: Math.round(quotedPrice),
    distanceKm,
    breakdown: {
      baseFare,
      distanceCharge,
      passengerSurcharge,
      airportFee,
    },
  };
}
