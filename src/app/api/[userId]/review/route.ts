import prisma from "@/lib/prisma";
import { isNumericalValue } from "@/util/util";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!isNumericalValue(Number(userId))) {
      return Response.json({ error: "Invalid userId" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { userId: Number(userId) },
    });

    return Response.json(reviews, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
