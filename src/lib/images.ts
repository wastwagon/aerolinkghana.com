export const IMAGES = {
  logo: "/images/aerolink-logo.png",
  icon: "/images/aerolink-icon.png",
  hero: "/images/hero-airport-transfer.png",
  meetGreet: "/images/experience-meet-greet.png",
  og: "/images/og-preview.png",
  fleet: {
    sedan: "/images/fleet-executive-sedan.png",
    suv: "/images/fleet-premium-suv.png",
    van: "/images/fleet-luxury-van.png",
  },
} as const;

export const FLEET_IMAGE_MAP: Record<string, string> = {
  "executive-sedan": IMAGES.fleet.sedan,
  "premium-suv": IMAGES.fleet.suv,
  "luxury-van": IMAGES.fleet.van,
};
