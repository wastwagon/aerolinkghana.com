export interface BlogImageMeta {
  image: string;
  imageAlt: string;
}

export const BLOG_IMAGES: Record<string, BlogImageMeta> = {
  "kotoka-airport-to-hotel-accra": {
    image: "/images/blog/blog-kotoka-to-hotel.png",
    imageAlt: "Chauffeured airport transfer from Kotoka International to Accra hotels",
  },
  "first-timers-guide-accra-airport": {
    image: "/images/blog/blog-first-timers-accra.png",
    imageAlt: "First-time traveller meet-and-greet at Kotoka International Airport",
  },
  "kotoka-airport-to-east-legon": {
    image: "/images/blog/blog-east-legon.png",
    imageAlt: "Private SUV transfer from Kotoka Airport to East Legon Accra",
  },
  "kotoka-to-cantonments-osu-labone": {
    image: "/images/blog/blog-cantonments-osu.png",
    imageAlt: "Executive sedan transfer to Cantonments and Osu Accra",
  },
  "airport-taxi-vs-private-transfer-accra": {
    image: "/images/blog/blog-taxi-vs-private.png",
    imageAlt: "Comparing airport taxi and private chauffeur service in Accra",
  },
  "kotoka-terminal-3-meet-and-greet": {
    image: "/images/blog/blog-terminal-3-meet-greet.png",
    imageAlt: "Terminal 3 arrivals hall meet-and-greet service at Kotoka Airport",
  },
  "kotoka-airport-to-tema": {
    image: "/images/blog/blog-kotoka-to-tema.png",
    imageAlt: "Luxury van transfer from Kotoka Airport to Tema Ghana",
  },
  "corporate-airport-transfer-accra": {
    image: "/images/blog/blog-corporate-transfer.png",
    imageAlt: "Corporate executive airport transfer fleet in Accra Ghana",
  },
  "accra-airport-transfer-prices-2026": {
    image: "/images/blog/blog-transfer-prices.png",
    imageAlt: "Fixed fare airport transfer pricing Accra Ghana 2026",
  },
  "kotoka-airport-hotel-transfers-marriott-kempinski": {
    image: "/images/blog/blog-hotel-marriott-kempinski.png",
    imageAlt: "Hotel transfer from Kotoka to Marriott and Kempinski Accra",
  },
};

export function getBlogImageMeta(slug: string, fallbackTitle: string): BlogImageMeta {
  return (
    BLOG_IMAGES[slug] ?? {
      image: "/images/blog/blog-kotoka-to-hotel.png",
      imageAlt: fallbackTitle,
    }
  );
}
