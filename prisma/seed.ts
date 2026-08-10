import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { RAW_BLOG_POSTS } from "../src/lib/blog";
import { getBlogImageMeta } from "../src/lib/blog-images";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@aerolinkghana.com" },
    update: {},
    create: {
      email: "admin@aerolinkghana.com",
      name: "Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "0555207204",
    },
  });
  console.log("Admin user:", admin.email);

  const vehicles = [
    {
      id: "executive-sedan",
      name: "Executive Sedan",
      description:
        "Mercedes E-Class or equivalent — the definitive choice for discerning business travellers and couples.",
      imageUrl: "/images/fleet-executive-sedan.png",
      capacity: 3,
      basePrice: 150,
      pricePerKm: 8,
      sortOrder: 1,
    },
    {
      id: "premium-suv",
      name: "Premium SUV",
      description:
        "Range Rover or Toyota Land Cruiser — generous space, commanding presence, and uncompromising comfort.",
      imageUrl: "/images/fleet-premium-suv.png",
      capacity: 5,
      basePrice: 220,
      pricePerKm: 10,
      sortOrder: 2,
    },
    {
      id: "luxury-van",
      name: "Luxury Van",
      description:
        "Mercedes Sprinter — the preferred vehicle for delegations, families, and corporate groups.",
      imageUrl: "/images/fleet-luxury-van.png",
      capacity: 10,
      basePrice: 350,
      pricePerKm: 12,
      sortOrder: 3,
    },
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: vehicle.id },
      update: {},
      create: vehicle,
    });
  }
  console.log("Vehicles seeded");

  const cmsPages = [
    {
      slug: "about",
      title: "About AeroLink Ghana",
      excerpt: "Accra's premier chauffeured airport transfer service.",
      content:
        "<h2>Our mission</h2><p>AeroLink Ghana delivers world-class transportation from Kotoka International Airport to destinations across Greater Accra — with intelligent flight tracking, terminal meet-and-greet, fixed transparent pricing, and twenty-four-hour concierge support.</p><h2>Headquarters</h2><p>We are headquartered at Burma Camp, Accra, Ghana.</p>",
      metaTitle: "About AeroLink Ghana",
      metaDescription:
        "Learn about AeroLink Ghana — premium chauffeured airport transfers at Kotoka International Airport.",
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      excerpt: "How AeroLink Ghana collects, uses, and protects your personal data.",
      content:
        "<h2>Information we collect</h2><p>When you book a transfer, we collect your name, email, phone number, flight details, and journey information necessary to fulfil your reservation.</p><h2>How we use your data</h2><ul><li>To confirm and manage your booking</li><li>To communicate transfer updates</li><li>To process payments securely via Paystack</li><li>To improve our service quality</li></ul><h2>Data retention</h2><p>Booking records are retained for operational and legal purposes. You may request deletion of non-essential data by contacting us.</p>",
      metaTitle: "Privacy Policy | AeroLink Ghana",
      metaDescription: "Privacy policy for AeroLink Ghana airport transfer bookings.",
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      excerpt: "Terms and conditions for AeroLink Ghana transfer bookings.",
      content:
        "<h2>Bookings</h2><p>All reservations are subject to vehicle availability and confirmed pickup details. Fares quoted at booking are fixed unless the journey details change materially.</p><h2>Cancellations</h2><p>Cancellations made at least 24 hours before pickup may qualify for a full refund. Late cancellations may incur a fee.</p><h2>Passenger conduct</h2><p>We reserve the right to refuse service where passenger conduct poses a safety risk to chauffeurs or vehicles.</p>",
      metaTitle: "Terms of Service | AeroLink Ghana",
      metaDescription: "Terms and conditions for booking airport transfers with AeroLink Ghana.",
    },
  ];

  for (const page of cmsPages) {
    await prisma.cmsPage.upsert({
      where: { slug: page.slug },
      update: {},
      create: { ...page, isPublished: true },
    });
  }
  console.log("CMS pages seeded");

  for (const post of RAW_BLOG_POSTS) {
    const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: new Date(post.publishedAt),
        readTime: post.readTime,
        imageUrl: image,
        imageAlt,
        sections: post.sections,
        isPublished: true,
      },
    });
  }
  console.log("Blog posts seeded");

  for (const [key, value] of Object.entries({
    site_name: "AeroLink Ghana",
    site_tagline: "World-Class Airport Transfers",
    contact_phone: "0555207204",
    contact_whatsapp: "233555207204",
    contact_email: "bookings@aerolinkghana.com",
    contact_address: "Burma Camp, Accra, Ghana",
    seo_default_description:
      "Premium chauffeured airport transfers at Kotoka International Airport, Accra. Fixed fares, flight tracking, and 24/7 concierge.",
    seo_og_image: "/images/og-preview.png",
    maintenance_mode: "false",
  })) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log("Site settings seeded");

  console.log("Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
