import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;

  try {
    const quotes = await prisma.quote.findMany({
      where: {
        bookId,
      },
    });

    return Response.json(quotes, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}
