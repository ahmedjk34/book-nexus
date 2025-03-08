import prisma from "@/lib/prisma";
import { isEmptyFields, isNumericalValue } from "@/util/util";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
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

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const { content, rating, bookId } = await req.json();
  if (isEmptyFields(bookId, rating, userId)) {
    return Response.json(
      { error: "Some required fields are empty" },
      { status: 400 }
    );
  }
  if (!isNumericalValue(Number(userId))) {
    return Response.json({ error: "Invalid userId" }, { status: 400 });
  }
  try {
    const review = await prisma.review.create({
      data: {
        content: content || "",
        rating,
        userId: Number(userId),
        bookId,
      },
    });
    return Response.json(review, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to add review" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { id, content, rating } = await req.json();

  if (isEmptyFields(id, content, rating)) {
    return Response.json(
      { error: "Required fields are empty" },
      { status: 400 }
    );
  }

  try {
    const review = await prisma.review.update({
      where: { id: Number(id) },
      data: {
        content,
        rating,
      },
    });
    return Response.json(review, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { id } = await req.json();
  try {
    await prisma.review.delete({
      where: { id: Number(id) },
    });
    return Response.json({}, { status: 204 });
  } catch (error) {
    return Response.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
