import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AeroLink Ghana — Airport Transfers",
    short_name: "AeroLink",
    description:
      "Premium chauffeured airport transfers from Kotoka International to Greater Accra.",
    start_url: "/",
    display: "standalone",
    background_color: "#1B365D",
    theme_color: "#1B365D",
    orientation: "portrait-primary",
    categories: ["travel", "business"],
    icons: [
      {
        src: "/images/aerolink-icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
