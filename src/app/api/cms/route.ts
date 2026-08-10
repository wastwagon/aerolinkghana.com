import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const pageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  isPublished: z.boolean().default(true),
});

export async function GET() {
  const pages = await prisma.cmsPage.findMany({
    where: { isPublished: true },
    orderBy: { title: "asc" },
  });
  return NextResponse.json(pages);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const data = pageSchema.parse(body);

  const page = await prisma.cmsPage.create({ data });
  return NextResponse.json(page, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;
  const parsed = pageSchema.parse(data);

  const page = await prisma.cmsPage.update({
    where: { id },
    data: parsed,
  });
  return NextResponse.json(page);
}
