import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: Number(userId) },
    });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
