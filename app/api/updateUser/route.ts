import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, res: Response) {
  const { userId, newName, newImage, newBio, newBackgroundImage } =
    await req.json();

  // Explicitly type updateData
  const updateData: { [key: string]: any } = {};

  if (newName) updateData.name = newName;
  if (newImage) updateData.image = newImage;
  if (newBio) updateData.bio = newBio;
  if (newBackgroundImage) updateData.backgroundImage = newBackgroundImage;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { message: "No valid fields to update" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      data: updateData,
      where: { id: userId },
    });

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
