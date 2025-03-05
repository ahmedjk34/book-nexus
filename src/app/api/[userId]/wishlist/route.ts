import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: Number(userId) },
    });
    return new Response(JSON.stringify(wishlist), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const { bookId } = await req.json();

  try {
    const wishlist = await prisma.wishlist.update({
      where: { userId: Number(userId) },
      data: {
        books: {
          push: bookId,
        },
      },
    });
    return new Response(JSON.stringify(wishlist), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
