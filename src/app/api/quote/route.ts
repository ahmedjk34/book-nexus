import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pageNumber = parseInt(url.searchParams.get("page") || "1", 10);

    const quotes = await prisma.quote.findMany({
      skip: (pageNumber - 1) * 10,
      take: 10,
    });

    return Response.json(quotes, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}
