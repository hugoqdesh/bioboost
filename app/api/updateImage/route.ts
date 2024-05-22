import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, res: Response) {
  const { userId, newImage } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      data: {
        image: newImage,
      },
      where: { id: userId },
    });

    return NextResponse.json({
      message: "Image updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
