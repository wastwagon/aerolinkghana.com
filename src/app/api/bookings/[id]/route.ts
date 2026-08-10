import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { vehicle: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isAdmin = session?.user?.role === "ADMIN";
  const isOwner = session?.user?.id && booking.userId === session.user.id;

  if (!isAdmin && !isOwner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(booking);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      status: body.status,
      paymentStatus: body.paymentStatus,
      adminNotes: body.adminNotes,
    },
    include: { vehicle: true },
  });

  return NextResponse.json(booking);
}
