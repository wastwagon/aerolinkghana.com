import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculatePrice } from "@/lib/pricing";
import { generateBookingReference } from "@/lib/utils";
import { notifyBookingCreated } from "@/lib/emails/send-booking-emails";
import {
  getClientIp,
  rateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

const bookingSchema = z.object({
  type: z.enum(["PICKUP", "DROPOFF"]),
  vehicleId: z.string().min(1),
  pickupLocation: z.string().min(3),
  dropoffLocation: z.string().min(3),
  pickupDate: z.string().datetime(),
  flightNumber: z.string().optional(),
  passengerCount: z.number().int().min(1).max(14),
  luggageCount: z.number().int().min(0).max(20).optional(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(["CASH", "MOBILE_MONEY", "CARD", "WHATSAPP"]).default("WHATSAPP"),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`booking:create:${ip}`, 10, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many booking attempts. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rl, 10) }
    );
  }

  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: data.vehicleId, isActive: true },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    const pricing = calculatePrice({
      vehicleBasePrice: Number(vehicle.basePrice),
      vehiclePricePerKm: Number(vehicle.pricePerKm),
      pickupLocation: data.pickupLocation,
      dropoffLocation: data.dropoffLocation,
      passengerCount: data.passengerCount,
      type: data.type,
    });

    const booking = await prisma.booking.create({
      data: {
        reference: generateBookingReference(),
        vehicleId: data.vehicleId,
        type: data.type,
        pickupLocation: data.pickupLocation,
        dropoffLocation: data.dropoffLocation,
        pickupDate: new Date(data.pickupDate),
        flightNumber: data.flightNumber,
        passengerCount: data.passengerCount,
        luggageCount: data.luggageCount ?? 0,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        specialRequests: data.specialRequests,
        quotedPrice: pricing.quotedPrice,
        distanceKm: pricing.distanceKm,
        paymentMethod: data.paymentMethod,
      },
      include: { vehicle: true },
    });

    notifyBookingCreated(booking.id);

    return NextResponse.json(
      {
        booking,
        pricing,
        message: "Booking created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { vehicle: true },
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
