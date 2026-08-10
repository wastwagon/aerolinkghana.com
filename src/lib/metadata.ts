import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080";

export const siteConfig = {
  name: "AeroLink Ghana",
  tagline: "World-Class Airport Transfers",
  description:
    "Ghana's premier chauffeured airport transfer service. Fixed fares, intelligent flight tracking, terminal meet-and-greet, and secure online payments from Kotoka International to anywhere in Accra.",
  url: siteUrl,
  ogImage: "/images/og-preview.png",
  twitterHandle: "@aerolinkghana",
  locale: "en_GH",
} as const;

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: overrides?.title ?? {
      default: `${siteConfig.name} | ${siteConfig.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: overrides?.description ?? siteConfig.description,
    keywords: [
      "airport transfer Accra",
      "Kotoka airport chauffeur",
      "premium taxi Ghana",
      "Burma Camp transfers",
      "luxury airport pickup",
      "Accra airport taxi",
      "corporate transport Ghana",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    icons: {
      icon: "/images/aerolink-icon.png",
      apple: "/images/aerolink-icon.png",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Premium airport transfers in Accra, Ghana`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: siteConfig.name,
    },
    formatDetection: {
      telephone: true,
      email: true,
    },
    ...overrides,
  };
}

export const defaultMetadata = createMetadata();
