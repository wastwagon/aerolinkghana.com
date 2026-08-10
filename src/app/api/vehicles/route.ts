import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/redis";

export async function GET() {
  try {
    const cached = await cacheGet("vehicles:active");
    if (cached) {
      return NextResponse.json(cached);
    }

    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    await cacheSet("vehicles:active", vehicles, 300);
    return NextResponse.json(vehicles);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
