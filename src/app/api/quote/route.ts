import prisma from "@/lib/prisma";
import { isNotEmptyFields, isNumericalValue } from "@/util/util";
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

export async function POST(req: NextRequest) {
  try {
    const { content, userId, bookId } = await req.json();

    //extract these checks into a util function ?

    if (isNotEmptyFields(content, userId, bookId)) {
      return Response.json(
        { error: "Content, userId, and bookId are required" },
        { status: 400 }
      );
    }

    if (isNumericalValue(Number(userId))) {
      return Response.json(
        { error: "userId must be numerical values" },
        { status: 400 }
      );
    }

    const quote = await prisma.quote.create({
      data: { content, bookId, userId: Number(userId) },
    });

    //return the quote in the future?

    return Response.json(
      { message: "Quote added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: "Failed to add a quote" }, { status: 500 });
  }
}
