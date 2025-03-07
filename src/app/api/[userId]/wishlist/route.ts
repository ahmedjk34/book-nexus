import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: Number(userId) },
    });
    return Response.json(wishlist, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
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

    return Response.json(wishlist, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

//even thought it's a delete method, we are updating under the hood (since each user should have a wishlist)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { bookId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { wishlist: true },
    });

    const currentWishlist = user?.wishlist;

    if (currentWishlist) {
      const updatedBooks = currentWishlist.books.filter((id) => id !== bookId);
      const updatedWishlist = await prisma.wishlist.update({
        where: { userId: Number(userId) },
        data: { books: updatedBooks },
      });

      return Response.json(updatedWishlist, { status: 200 });
    } else {
      return Response.json({ error: "Wishlist not found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
