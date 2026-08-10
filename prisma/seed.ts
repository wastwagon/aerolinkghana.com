import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

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

  await prisma.cmsPage.upsert({
    where: { slug: "about" },
    update: {},
    create: {
      slug: "about",
      title: "About AeroLink Ghana",
      content:
        "AeroLink Ghana is Accra's premier chauffeured airport transfer service, headquartered at Burma Camp. We deliver world-class transportation from Kotoka International Airport to destinations across Greater Accra — with intelligent flight tracking, terminal meet-and-greet, fixed transparent pricing, and twenty-four-hour concierge support.",
      isPublished: true,
    },
  });
  console.log("CMS pages seeded");

  console.log("Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
