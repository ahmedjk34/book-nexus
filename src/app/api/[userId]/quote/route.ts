import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

//Get quotes done by a certain user
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const quotes = await prisma.quote.findMany({
      where: {
        userId: Number(userId),
      },
    });
    return Response.json(quotes, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "An error occurred while fetching quotes." },
      { status: 500 }
    );
  }
}
