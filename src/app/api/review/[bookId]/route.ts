import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const { bookId } = params;

  try {
    const reviews = await prisma.review.findMany({
      where: { bookId: bookId },
    });

    return Response.json(reviews, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
